# Les Fonctions en Python

## Qu'est-ce qu'une fonction ?

Une **fonction** est un bloc de code réutilisable qui effectue une tâche spécifique. Les fonctions permettent d'organiser le code et d'éviter les répétitions.

## Définir une fonction simple

```python:executable
# Définir une fonction
def dire_bonjour():
    print("Bonjour !")
    print("Comment allez-vous ?")

# Appeler la fonction
dire_bonjour()
print()
dire_bonjour()
```

## Fonctions avec paramètres

```python:executable
# Fonction avec un paramètre
def saluer(nom):
    print(f"Bonjour {nom} !")

# Appeler la fonction avec différents arguments
saluer("Alice")
saluer("Bob")
saluer("Charlie")
```

## Fonctions avec plusieurs paramètres

```python:executable
# Fonction avec plusieurs paramètres
def presenter(nom, age, ville):
    print(f"Je m'appelle {nom}")
    print(f"J'ai {age} ans")
    print(f"J'habite à {ville}")
    print()

# Appel de la fonction
presenter("Emma", 16, "Paris")
presenter("Lucas", 17, "Lyon")
```

## Fonctions avec valeur de retour

```python:executable
# Fonction qui calcule et retourne une valeur
def addition(a, b):
    resultat = a + b
    return resultat

# Utiliser la valeur retournée
somme = addition(5, 3)
print(f"5 + 3 = {somme}")

# On peut utiliser directement le résultat
print(f"10 + 7 = {addition(10, 7)}")

# Utiliser dans un calcul
double_somme = addition(4, 6) * 2
print(f"(4 + 6) × 2 = {double_somme}")
```

## Fonctions mathématiques

```python:executable
# Fonction pour calculer l'aire d'un rectangle
def aire_rectangle(longueur, largeur):
    return longueur * largeur

# Fonction pour calculer le périmètre d'un rectangle
def perimetre_rectangle(longueur, largeur):
    return 2 * (longueur + largeur)

# Utilisation
l = 8
L = 5

print(f"Rectangle de {l}×{L} :")
print(f"Aire = {aire_rectangle(l, L)} cm²")
print(f"Périmètre = {perimetre_rectangle(l, L)} cm")
```

## Paramètres par défaut

```python:executable
# Fonction avec paramètre par défaut
def puissance(nombre, exposant=2):
    return nombre ** exposant

# Utilisation
print(f"5² = {puissance(5)}")        # Utilise l'exposant par défaut (2)
print(f"5³ = {puissance(5, 3)}")     # Spécifie un exposant différent
print(f"2⁴ = {puissance(2, 4)}")
```

## Fonctions avec listes

```python:executable
# Fonction qui calcule la moyenne d'une liste
def calculer_moyenne(notes):
    if len(notes) == 0:
        return 0
    return sum(notes) / len(notes)

# Fonction qui trouve le maximum
def trouver_max(liste):
    if len(liste) == 0:
        return None
    maximum = liste[0]
    for element in liste:
        if element > maximum:
            maximum = element
    return maximum

# Utilisation
mes_notes = [15, 12, 18, 14, 16]
print(f"Notes : {mes_notes}")
print(f"Moyenne : {calculer_moyenne(mes_notes):.2f}/20")
print(f"Meilleure note : {trouver_max(mes_notes)}/20")
```

## Exercice : Fonctions de conversion

```python:executable
# Fonction pour convertir °C en °F
def celsius_vers_fahrenheit(celsius):
    return (celsius * 9/5) + 32

# Fonction pour convertir °F en °C
def fahrenheit_vers_celsius(fahrenheit):
    return (fahrenheit - 32) * 5/9

# Tests
temp_c = 25
temp_f = celsius_vers_fahrenheit(temp_c)
print(f"{temp_c}°C = {temp_f:.1f}°F")

temp_f = 77
temp_c = fahrenheit_vers_celsius(temp_f)
print(f"{temp_f}°F = {temp_c:.1f}°C")
```

## Fonctions et conditions

```python:executable
# Fonction qui détermine si un nombre est pair
def est_pair(nombre):
    return nombre % 2 == 0

# Fonction qui donne la mention d'une note
def obtenir_mention(note):
    if note >= 16:
        return "Très bien"
    elif note >= 14:
        return "Bien"
    elif note >= 12:
        return "Assez bien"
    elif note >= 10:
        return "Passable"
    else:
        return "Insuffisant"

# Tests
print(f"8 est pair ? {est_pair(8)}")
print(f"7 est pair ? {est_pair(7)}")
print()

notes_test = [18, 15, 12, 9]
for note in notes_test:
    mention = obtenir_mention(note)
    print(f"Note : {note}/20 → Mention : {mention}")
```

## Fonctions récursives (avancé)

Une fonction peut s'appeler elle-même : c'est la **récursivité**.

```python:executable
# Fonction récursive pour calculer la factorielle
def factorielle(n):
    if n <= 1:
        return 1
    else:
        return n * factorielle(n - 1)

# Fonction récursive pour la suite de Fibonacci
def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Tests
print("Factorielles :")
for i in range(1, 6):
    print(f"{i}! = {factorielle(i)}")

print("\nSuite de Fibonacci :")
for i in range(8):
    print(f"F({i}) = {fibonacci(i)}")
```

## Exercice pratique : Calculatrice

```python:executable
# Créer des fonctions pour une calculatrice
def additionner(a, b):
    return a + b

def soustraire(a, b):
    return a - b

def multiplier(a, b):
    return a * b

def diviser(a, b):
    if b == 0:
        return "Erreur : division par zéro"
    return a / b

# Utiliser la calculatrice
x = 15
y = 3

print(f"{x} + {y} = {additionner(x, y)}")
print(f"{x} - {y} = {soustraire(x, y)}")
print(f"{x} × {y} = {multiplier(x, y)}")
print(f"{x} ÷ {y} = {diviser(x, y):.2f}")

# Test de la division par zéro
print(f"{x} ÷ 0 = {diviser(x, 0)}")
```

## Bonnes pratiques

```python:executable
# Fonction bien documentée avec un docstring
def calculer_imc(poids, taille):
    """
    Calcule l'Indice de Masse Corporelle (IMC).
    
    Paramètres:
        poids (float): Le poids en kilogrammes
        taille (float): La taille en mètres
    
    Retourne:
        float: L'IMC calculé
    """
    return poids / (taille ** 2)

# Utilisation
mon_poids = 65  # kg
ma_taille = 1.70  # m

imc = calculer_imc(mon_poids, ma_taille)
print(f"IMC : {imc:.1f}")

# Afficher la documentation
print("\nDocumentation de la fonction :")
print(calculer_imc.__doc__)
```

## À retenir

- Une fonction se définit avec le mot-clé `def`
- Les fonctions peuvent avoir des paramètres
- On utilise `return` pour renvoyer une valeur
- Les fonctions permettent de réutiliser du code
- Il est bon de documenter ses fonctions avec des docstrings
- Les paramètres peuvent avoir des valeurs par défaut
