export function createValidHtmlId(str: string): string {
  // Remove any characters that are not alphanumeric, underscore, or hyphen
  const validCharacters = /[^\w-]/g;
  const sanitizedStr = str.replace(validCharacters, '');
  // Replace any remaining spaces with hyphens
  const hyphenatedStr = sanitizedStr.replace(/\s+/g, '-');
  // Make sure the ID starts with a letter
  const startsWithLetter = /^[A-Za-z]/;
  const finalStr = hyphenatedStr.replace(startsWithLetter, (match) =>
    match.toLowerCase()
  );
  return finalStr;
}
