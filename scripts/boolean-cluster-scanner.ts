#!/usr/bin/env node
/**
 * Phase 2 scanner: finds interfaces and classes with 3 or more boolean fields.
 * These are candidates for conversion to discriminated unions.
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import ts from 'typescript';

const ROOT = new URL('../src/ts/main', import.meta.url).pathname;

function walk(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory() && !entry.startsWith('.')) {
      results.push(...walk(full));
    } else if (entry.endsWith('.ts') && !entry.endsWith('.test.ts')) {
      results.push(full);
    }
  }
  return results;
}

let clusters = 0;
const THRESHOLD = 3;

for (const file of walk(ROOT)) {
  const source = ts.createSourceFile(
    file,
    readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true
  );

  function visit(node: ts.Node) {
    const isInterface = ts.isInterfaceDeclaration(node);
    const isClass = ts.isClassDeclaration(node);
    const isTypeLiteral = ts.isTypeLiteralNode(node);

    if (isInterface || isClass || isTypeLiteral) {
      const name = isInterface
        ? node.name?.text
        : isClass
          ? node.name?.text ?? '<anonymous>'
          : '<type literal>';

      const members = isTypeLiteral ? node.members : (node as ts.ClassDeclaration | ts.InterfaceDeclaration).members;
      const booleanFields: string[] = [];

      for (const member of members) {
        if (ts.isPropertySignature(member) || ts.isPropertyDeclaration(member)) {
          const typeNode = member.type;
          if (typeNode && ts.isToken(typeNode) && typeNode.kind === ts.SyntaxKind.BooleanKeyword) {
            const memberName = member.name && ts.isIdentifier(member.name) ? member.name.text : '?';
            booleanFields.push(memberName);
          }
        }
      }

      if (booleanFields.length >= THRESHOLD) {
        const { line } = source.getLineAndCharacterOfPosition(node.getStart());
        console.log(
          `${relative(ROOT, file)}:${line + 1} [${name}]: ${booleanFields.length} boolean fields — ${booleanFields.join(', ')}`
        );
        clusters++;
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(source);
}

if (clusters === 0) {
  console.log('boolean-cluster-scanner: no clusters found ✓');
} else {
  console.log(`\nboolean-cluster-scanner: ${clusters} cluster(s) found — review for discriminated union conversion`);
}
