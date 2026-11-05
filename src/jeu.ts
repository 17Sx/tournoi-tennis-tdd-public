import type { Classement } from "./classement";

const ANNONCES = ["Zéro", "Quinze", "Trente", "Quarante"];
const QUARANTE = 3;

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
    const vainqueur = this.vainqueur();
    if (vainqueur) {
      return `Victoire ${vainqueur}`;
    }
    if (this.points1 === QUARANTE && this.points2 === QUARANTE) {
      return "Égalité";
    }
    if (this.points1 === this.points2 && this.points1 > 0) {
      return `${ANNONCES[this.points1]}-A`;
    }
    return `${ANNONCES[this.points1]}-${ANNONCES[this.points2]}`;
  }

  private vainqueur(): string | undefined {
    if (this.points1 > QUARANTE) return this.joueur1;
    if (this.points2 > QUARANTE) return this.joueur2;
    return undefined;
  }
}
