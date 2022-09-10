export class Player {
  private id: number;
  private name: string;
  private mmr: number;

  constructor(id: number, name: string, mmr: number) {
    this.id = id;
    this.name = name;
    this.mmr = mmr;
  }

  getId(): number {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getMmr(): number {
    return this.mmr;
  }
}
