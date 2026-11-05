import { describe, expect, it } from "vitest";
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
