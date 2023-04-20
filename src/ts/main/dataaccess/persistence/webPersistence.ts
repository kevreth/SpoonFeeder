// set, get, and remove a variable ("item") from the WebStorage API
// "target" is either "localStorage" or "sessionStorage" without quotes.
export class WebStorageVariable {
  constructor(private readonly item: string, private readonly target: Storage) {}
  public set(val: string) {
    this.target.setItem(this.item, val);
  }
  public get() {
    return this.target.getItem(this.item);
  }
  public remove() {
    this.target.removeItem(this.item);
  }
}
//Specializes WebStorageVariable for boolean (flag) values for simpler use
export class WebStorageFlag {
  private superd;
  constructor(item: string, target: Storage) {
    this.superd = new WebStorageVariable(item, target);
  }
  public set() {
    this.superd.set('true');
  }
  public clear() {
    this.superd.set('false');
  }
  public is() {
    //assume key not existing is false
    return this.superd.get() === 'true' ? true : false;
  }
  public remove() {
    this.superd.remove();
  }
}
