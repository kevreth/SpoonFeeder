export class QuotaGuard {
  private limits = new Map<string, number>();

  setLimit(key: string, bytes: number): void {
    this.limits.set(key, bytes);
  }

  guard(key: string, serialized: string): void {
    const limit = this.limits.get(key);
    if (limit !== undefined && serialized.length > limit) {
      throw new Error(
        `QuotaGuard: key "${key}" exceeds ${limit} byte limit (${serialized.length})`
      );
    }
  }
}
