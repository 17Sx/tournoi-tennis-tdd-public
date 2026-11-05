import { describe, expect, it, vi } from "vitest";
import type { Classement } from "./classement";
import { Jeu } from "./jeu";


const classementDummy: Classement = { enregistrer: () => {} };

function jeuAuScore(pointsAlice: number, pointsBob: number): Jeu {
  const jeu = new Jeu("Alice", "Bob", classementDummy);
  for (let i = 0; i < Math.max(pointsAlice, pointsBob); i++) {
    if (i < pointsAlice) jeu.pointPour("Alice");
    if (i < pointsBob) jeu.pointPour("Bob");
  }
  return jeu;
}

// dummy : on teste que le score ici, le classement est juste obligatoire pour creer le jeu.
// un stub sert a rien vu que enregistrer renvoie rien, et un spy ca ferait du bruit
// parceque on regarde pas ce qu'il recoit
describe("Étape 1 : les points", () => {
  it("un match commence à Zéro-Zéro", () => {
    expect(jeuAuScore(0, 0).score()).toBe("Zéro-Zéro");
  });

  it("le premier point d'un joueur s'annonce Quinze", () => {
    expect(jeuAuScore(1, 0).score()).toBe("Quinze-Zéro");
  });

  it("le score s'écrit toujours joueur 1 puis joueur 2", () => {
    expect(jeuAuScore(2, 1).score()).toBe("Trente-Quinze");
  });

  it("le troisième point s'annonce Quarante", () => {
    expect(jeuAuScore(3, 2).score()).toBe("Quarante-Trente");
  });

  it.each([
    [1, "Quinze-A"],
    [2, "Trente-A"],
  ])("à %i point partout, le score s'annonce %s", (points, attendu) => {
    expect(jeuAuScore(points, points).score()).toBe(attendu);
  });
});

describe("Étape 2 : le point décisif", () => {
  it("à 40-40, le score affiche Égalité", () => {
    expect(jeuAuScore(3, 3).score()).toBe("Égalité");
  });

  it("à Égalité, il n'y a pas d'avantage : le point suivant gagne le match", () => {
    expect(jeuAuScore(4, 3).score()).toBe("Victoire Alice");
  });
});

describe("Étape 3 : la victoire", () => {
  it("le joueur à Quarante qui marque gagne le match", () => {
    expect(jeuAuScore(4, 1).score()).toBe("Victoire Alice");
  });

  it("le joueur 2 peut aussi gagner le match", () => {
    expect(jeuAuScore(2, 4).score()).toBe("Victoire Bob");
  });
});

describe("Étape 4 : le classement du tournoi", () => {
  function marquer(jeu: Jeu, joueur: string, points: number): void {
    for (let i = 0; i < points; i++) jeu.pointPour(joueur);
  }

  // spy : enregistrer renvoie rien donc il faut regarder l'appel (combien de fois, avec quoi).
  // un stub verrait rien et un fake c'est trop lourd, on a pas besoin d'un vrai classement
  it("le résultat est enregistré à la fin du match, pas avant, avec le vainqueur en premier", () => {
    const classement = { enregistrer: vi.fn() };
    const jeu = new Jeu("Alice", "Bob", classement);

    marquer(jeu, "Alice", 3);
    expect(classement.enregistrer).not.toHaveBeenCalled();

    jeu.pointPour("Alice");
    expect(classement.enregistrer).toHaveBeenCalledWith("Alice", "Bob");
  });

  // spy : pareil, ici on verifie l'ordre des arguments quand le joueur 2 gagne.
  // on constate juste apres coup donc pas besoin d'un mock preparer a l'avance
  it("quand le joueur 2 gagne, il est enregistré en premier", () => {
    const classement = { enregistrer: vi.fn() };
    const jeu = new Jeu("Alice", "Bob", classement);

    marquer(jeu, "Bob", 4);

    expect(classement.enregistrer).toHaveBeenCalledWith("Bob", "Alice");
  });

  // spy : la regle c'est le nombre d'appels, il faut un double qui les compte.
  // vi.fn() le fait deja, pas besoin d'ecrire un compteur a la main
  it("une fois le match fini, un point de plus ne change ni le score ni le classement", () => {
    const classement = { enregistrer: vi.fn() };
    const jeu = new Jeu("Alice", "Bob", classement);

    marquer(jeu, "Bob", 4);
    marquer(jeu, "Alice", 4);

    expect(jeu.score()).toBe("Victoire Bob");
    expect(classement.enregistrer).toHaveBeenCalledTimes(1);
  });
});
