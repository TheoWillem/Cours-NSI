# Introduction à Python

## Qu'est-ce que Python ?

Python est un langage de programmation **interprété**, **orienté objet** et de **haut niveau**. Il est très populaire en informatique et particulièrement adapté pour l'enseignement.

### Les avantages de Python

- Syntaxe simple et lisible
- Grande communauté
- Nombreuses bibliothèques
- Utilisé dans de nombreux domaines (web, data science, IA, etc.)

## Premier programme

Commençons par le traditionnel "Hello World" :

```python:executable
print("Hello World!")
print("Bienvenue dans le cours de NSI")
```

## Les variables

En Python, on peut créer des variables très simplement :

```python:executable
# Créer des variables
nom = "Alice"
age = 16
taille = 1.65

# Afficher les variables
print(f"Je m'appelle {nom}")
print(f"J'ai {age} ans")
print(f"Je mesure {taille}m")
```

## Les opérations mathématiques

Python peut être utilisé comme une calculatrice :

```python:executable
# Addition et soustraction
a = 10 + 5
b = 20 - 7
print(f"10 + 5 = {a}")
print(f"20 - 7 = {b}")

# Multiplication et division
c = 6 * 7
d = 15 / 3
print(f"6 × 7 = {c}")
print(f"15 ÷ 3 = {d}")

# Puissance
e = 2 ** 8
print(f"2^8 = {e}")
```

## Exercice pratique

Essayez de modifier le code ci-dessous pour calculer l'aire d'un rectangle de longueur 12 et largeur 8 :

```python:executable
# À vous de jouer !
longueur = 12
largeur = 8

# Calculez l'aire ici
aire = longueur * largeur

print(f"L'aire du rectangle est : {aire}")
```

## Les types de données

Python possède plusieurs types de données de base :

```python:executable
# Entier (int)
nombre_entier = 42

# Flottant (float)
nombre_decimal = 3.14

# Chaîne de caractères (str)
texte = "Bonjour"

# Booléen (bool)
vrai_ou_faux = True

# Afficher les types
print(f"{nombre_entier} est de type {type(nombre_entier)}")
print(f"{nombre_decimal} est de type {type(nombre_decimal)}")
print(f"{texte} est de type {type(texte)}")
print(f"{vrai_ou_faux} est de type {type(vrai_ou_faux)}")
```

## Conclusion

Dans ce cours, nous avons vu :
- Comment afficher du texte avec `print()`
- Comment créer des variables
- Les opérations mathématiques de base
- Les types de données principaux

Dans le prochain cours, nous verrons les listes en Python !
