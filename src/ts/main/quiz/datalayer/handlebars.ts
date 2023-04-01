const KEYS = ['svg', 'table'];
export function substitute(str: string) {
  const regex = /(\w+)=(\w+)/g;
  let match;
  while ((match = regex.exec(str))) {
    const key = match[1];
    const includes = KEYS.includes(key);
    if (includes) {
      const value = match[2];
      const find = `${key}=${value}`;
      const replace = `{{{${key} '${value}'}}}`;
      str = str.replace(find, replace);
    }
  }
  return str;
}
