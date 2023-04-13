export function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value);
}
export function getLocalStorage(key: string) {
  return localStorage.getItem(key) as string;
}
export function setSessionStorage(key: string, value: string) {
  sessionStorage.setItem(key, value);
}
export function getSessionStorage(key: string) {
  return sessionStorage.getItem(key) as string;
}
export function clearSessionStorage() {
  sessionStorage.clear();
}
