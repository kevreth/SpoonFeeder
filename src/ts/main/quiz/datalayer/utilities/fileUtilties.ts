import * as yaml from 'js-yaml';

export function getYaml<T>(filename: string, f: (data: T) => void) {
  fetch(filename)
    .then((res) => res.blob())
    .then((blob) => blob.text())
    .then((yamlAsString) => {
      const yml = yaml.load(yamlAsString) as T;
      f(yml);
    })
    .catch((err) => console.log('yaml err:', err));
}
export async function getYaml2<T>(filename: string): Promise<T> {
  const res = await fetch(filename);
  const blob = await res.blob();
  const yamlAsString = await blob.text();
  const yml = yaml.load(yamlAsString) as T;
  return yml; // Return the YAML as a string
}
