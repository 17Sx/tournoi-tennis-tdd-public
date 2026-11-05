import type { Classement } from "./classement";
import { Jeu } from "./jeu";

const JEUX_POUR_GAGNER = 4;

export class MatchEnUnSet {
  private jeu: Jeu;
  private jeux = new Map<string, number>();

  constructor(
    private joueur1: string,
    private joueur2: string,
    private classement: Classement,
  ) {
    this.jeu = this.nouveauJeu();
  }

  pointPour(joueur: string): void {
    if (this.vainqueur()) return;

    this.jeu.pointPour(joueur);
  }

  score(): string {
    const vainqueur = this.vainqueur();
    if (vainqueur) {
      const perdant = this.adversaire(vainqueur);
      return `Victoire ${vainqueur} ${this.jeuxGagnes(vainqueur)}-${this.jeuxGagnes(perdant)}`;
    }
    return this.jeu.score();
  }

  jeuxGagnes(joueur: string): number {
    return this.jeux.get(joueur) ?? 0;
  }

  private vainqueur(): string | undefined {
    return [this.joueur1, this.joueur2].find((joueur) => this.jeuxGagnes(joueur) === JEUX_POUR_GAGNER);
  }

  private adversaire(joueur: string): string {
    return joueur === this.joueur1 ? this.joueur2 : this.joueur1;
  }

  private nouveauJeu(): Jeu {
    return new Jeu(this.joueur1, this.joueur2, {
      enregistrer: (vainqueur) => this.jeuGagnePar(vainqueur),
    });
  }

  private jeuGagnePar(joueur: string): void {
    this.jeux.set(joueur, this.jeuxGagnes(joueur) + 1);
    this.jeu = this.nouveauJeu();

    const vainqueur = this.vainqueur();
    if (vainqueur) {
      this.classement.enregistrer(vainqueur, this.adversaire(vainqueur));
    }
  }
}
