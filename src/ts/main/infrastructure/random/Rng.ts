export interface Rng {
  random(): number;
  seed(value: number): void;
}
