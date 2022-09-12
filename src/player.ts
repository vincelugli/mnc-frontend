export class Player {
  private name: string;
  private mmr: number;

  constructor(name: string, mmr: number) {
    this.name = name;
    this.mmr = mmr;
  }

  getName(): string {
    return this.name;
  }
  getMmr(): number {
    return this.mmr;
  }
}
