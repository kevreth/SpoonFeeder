import * as yaml from 'js-yaml';
// Read-only.
export async function getYaml2<T>(filename: string): Promise<T> {
  const res = await fetch(filename);
  const blob = await res.blob();
  const yamlAsString = await blob.text();
  const yml = yaml.load(yamlAsString) as T;
  return yml; // Return the YAML as a string
}
