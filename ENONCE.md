# Examen TDD : le tournoi de tennis de l'école

**Durée** : 40 minutes (55 minutes avec le bonus) · **Langage** : TypeScript (Vitest)

L'école organise un tournoi de tennis. C'est une version simplifiée du jeu de tennis : **un match se joue en un seul jeu**, et le premier joueur qui gagne le jeu gagne le match.

On te demande d'écrire, **en TDD**, le code qui tient le score.

## Mise en place

```bash
npm install
git init && git add . && git commit -m "départ"
npm run test:watch
```

## Ce qui est imposé

Pour que ton code puisse être corrigé, seul le point d'entrée est imposé :

- une classe `Jeu`, exportée depuis `src/jeu.ts` ;
- créée avec le nom des deux joueurs et le classement du tournoi (voir l'étape 4) : `new Jeu("Alice", "Bob", classement)` ;
- une méthode `pointPour(joueur: string)`, qui fait marquer un point à ce joueur ;
- une méthode `score(): string`, qui renvoie le score ;
- l'interface `Classement`, à écrire dans `src/classement.ts`, à ne pas modifier (voir étape 4) ;


Tout le reste (l'organisation de ton code, les autres classes ou fonctions, les noms internes) est libre.

Le score s'écrit toujours dans l'ordre **joueur 1, puis joueur 2**.

## Les règles

### Étape 1 : les points

Les points s'annoncent **en français** : `Zéro`, `Quinze`, `Trente`, `Quarante`.

| Points Alice | Points Bob | `score()` |
|---|---|---|
| 0 | 0 | `"Zéro-Zéro"` |
| 1 | 0 | `"Quinze-Zéro"` |
| 2 | 1 | `"Trente-Quinze"` |
| 3 | 2 | `"Quarante-Trente"` |
| 1 | 1 | `"Quinze-A"` |
| 2 | 2 | `"Trente-A"` |

### Étape 2 : le point décisif

À 40-40, `score()` affiche `"Égalité"`.

**Il n'y a pas d'avantage** : à `"Égalité"`, le point suivant gagne le match.

### Étape 3 : la victoire

Le joueur qui marque alors qu'il est à `Quarante` gagne le match : `score()` affiche `"Victoire Alice"` (ou `"Victoire Bob"`).

### Étape 4 : le classement du tournoi

À la fin du match, le résultat doit être envoyé au **classement du tournoi**. Ce classement est un service externe, géré par l'association sportive : il n'existe pas encore, et de toute façon on ne veut pas l'appeler pendant les tests.

Seule son interface est imposée. A écrire dans `src/classement.ts` :

```ts
export interface Classement {
  enregistrer(vainqueur: string, perdant: string): void;
}
```

Le classement est donné au jeu à sa création : `new Jeu("Alice", "Bob", classement)`.

**La règle** : le résultat est enregistré **une seule fois**, à la fin du match, avec le vainqueur en premier.

**Les doubles de test** : pour tester ton code, utilise les doubles de test de ton choix (dummy, stub, spy, mock, fake), écrits à la main ou avec `vi.fn()`.

**Pour chaque double utilisé, justifie ton choix** en 2 ou 3 lignes, dans un commentaire au-dessus du test : pourquoi ce type de double, et pas un autre ?

## Bonus : le match en un set

Le tournoi veut aussi proposer des matchs plus longs, **en un set**. Les règles d'un jeu ne changent pas, et `Jeu` doit continuer à fonctionner comme aux étapes 1 à 3.

- Le premier joueur à **4 jeux** gagne le match, **sans qu'il faille 2 jeux d'écart** : 4-3 suffit.
- Pendant le match, on doit pouvoir connaître le score du jeu en cours et le nombre de jeux gagnés par chacun.
- Une fois le match gagné, le score annonce le vainqueur, avec **son nombre de jeux en premier** : `"Victoire Alice 4-2"`, `"Victoire Bob 4-1"`.
- Le classement enregistre le résultat **du match**, pas celui de chaque jeu.

À toi de décider comment l'écrire.

## Le rendu

Ta démarche compte autant que ton code. Elle se lit dans ton historique git :

- **un commit par étape du cycle**, avec un préfixe :
  - `red: ...` quand tu ajoutes un test qui échoue ;
  - `green: ...` quand tu le fais passer ;
  - `refactor: ...` quand tu nettoies (optionnel, s'il n'y a rien à nettoyer) ;
- le test est **toujours commité avant** le code qui le fait passer ;
- des noms de tests qui décrivent une **règle**, en français.

À la fin, rends ton dossier avec son `.git`, ou bien le lien vers ton dépôt.

**Barème indicatif** : le code et les tests sur 14 points (dont 3 pour l'étape 4 et 2 pour le bonus), la démarche TDD (l'historique git) sur 6 points.
