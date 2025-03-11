import { fail } from 'assert';
import { expect } from 'vitest';
const MSG_PREFIX = 'Problem creating test instance in test class ';
export abstract class AbstractTest<T extends object> {
  private testable!: T;
  protected abstract factory(): T;
  protected getTestableName(): string {
    return this.testable.constructor.name;
  }
  public getTestName(): string {
    return this.constructor.name;
  }
  public getTestable(): T {
    return this.testable;
  }
  private message(): string {
    return MSG_PREFIX + this.getTestableName();
  }
  public beforeEach() {
    try {
      this.testable = this.factory();
    } catch (e) {
      const msg = MSG_PREFIX + this.getTestName();
      fail(msg);
    }
    expect(this.testable).not.toBeNull();
    const msg = this.message();
    expect(msg).not.toBeNull();
  }
}
