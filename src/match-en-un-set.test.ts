import { describe, expect, it, vi } from "vitest";
import type { Classement } from "./classement";
import { MatchEnUnSet } from "./match-en-un-set";

// dumy : ici on regarde que le score et les jeux, le classement est juste demander a la creation.
// un spy apporterait rien vu qu'on regarde pas ses appels dans ces tests
const classementDummy: Classement = { enregistrer: () => {} };

function gagnerJeux(match: MatchEnUnSet, joueur: string, jeux: number): void {
  for (let i = 0; i < jeux * 4; i++) match.pointPour(joueur);
}

describe("Bonus : le match en un set", () => {
  it("un match commence à 0-0", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    expect(match.score()).toBe("Zéro-Zéro");
    expect(match.jeuxGagnes("Alice")).toBe(0);
    expect(match.jeuxGagnes("Bob")).toBe(0);
  });

  it("le score du jeu en cours suit les regles d'un jeu", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    match.pointPour("Alice");
    match.pointPour("Alice");
    match.pointPour("Bob");

    expect(match.score()).toBe("Trente-Quinze");
  });

  it("gagner un jeu ajoute un jeu au vainqueur et relancee", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    gagnerJeux(match, "Bob", 1);

    expect(match.jeuxGagnes("Bob")).toBe(1);
    expect(match.jeuxGagnes("Alice")).toBe(0);
    expect(match.score()).toBe("Zéro-Zéro");
  });

  it("le premier à 4 jeux gagne le match", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    gagnerJeux(match, "Bob", 3);
    gagnerJeux(match, "Alice", 4);

    expect(match.score()).toBe("Victoire Alice 4-3");
  });

  it("le score final donne d'abord le nombre de jeux du vainqueur", () => {
    const match = new MatchEnUnSet("Alice", "Bob", classementDummy);

    gagnerJeux(match, "Alice", 1);
    gagnerJeux(match, "Bob", 4);

    expect(match.score()).toBe("Victoire Bob 4-1");
  });

  // spy : comme pour Jeu, on regarde un appel sortant sans valeur de retour.
  // ca prouve surtout qu'il y a pas d'appel a la fin de chaque jeu, un stub le verrait pas
  it("le classement enregistre le result du match", () => {
    const classement = { enregistrer: vi.fn() };
    const match = new MatchEnUnSet("Alice", "Bob", classement);

    gagnerJeux(match, "Bob", 2);
    gagnerJeux(match, "Alice", 3);
    expect(classement.enregistrer).not.toHaveBeenCalled();

    gagnerJeux(match, "Alice", 1);
    expect(classement.enregistrer).toHaveBeenCalledWith("Alice", "Bob");
  });

  // spy : on compte les appels comme pour un jeu. le score est dans le meme test
  // car c'est la meme regle : le match est fini
  it("une fois le match win les points suivants ne changent plus rien", () => {
    const classement = { enregistrer: vi.fn() };
    const match = new MatchEnUnSet("Alice", "Bob", classement);

    gagnerJeux(match, "Alice", 4);
    gagnerJeux(match, "Bob", 2);

    expect(match.score()).toBe("Victoire Alice 4-0");
    expect(classement.enregistrer).toHaveBeenCalledTimes(1);
  });
});
