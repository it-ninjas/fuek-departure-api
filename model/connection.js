export class Connection {
  constructor(id, from, to, userId) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.userId = userId;
  }

  static fromJSON(json) {
    return new this(json.id, json.from, json.to, json.userId);
  }
}
