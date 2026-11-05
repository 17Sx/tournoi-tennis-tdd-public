import type { Classement } from "./classement";

const ANNONCES = ["Zéro", "Quinze", "Trente", "Quarante"];

export class Jeu {
  private points1 = 0;
  private points2 = 0;

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {}

  pointPour(joueur: string): void {
    if (joueur === this.joueur1) {
      this.points1++;
    } else {
      this.points2++;
    }
  }

  score(): string {
    if (this.points1 === this.points2 && this.points1 > 0) {
      return `${ANNONCES[this.points1]}-A`;
    }
    return `${ANNONCES[this.points1]}-${ANNONCES[this.points2]}`;
  }
}
