# Test de Gestion des Erreurs

## Code qui fonctionne correctement

```python:executable
print("Ce code fonctionne bien")
x = 10
y = 5
print(f"x + y = {x + y}")
```

## Erreur de division par zéro

```python:executable
print("Avant l'erreur")
x = 10
y = 0
resultat = x / y  # Ceci va générer une erreur
print("Après l'erreur (ne s'affichera pas)")
```

## Erreur de type (TypeError)

```python:executable
nombre = 5
texte = "hello"
resultat = nombre + texte  # On ne peut pas additionner un nombre et une chaîne
print("Ceci ne s'affichera pas")
```

## Erreur de nom de variable (NameError)

```python:executable
print("Début du programme")
print(variable_inexistante)  # Cette variable n'existe pas
print("Fin du programme")
```

## Erreur d'index (IndexError)

```python:executable
ma_liste = [1, 2, 3]
print("Ma liste:", ma_liste)
print("Élément à l'index 10:", ma_liste[10])  # Index hors limites
```

## Erreur de clé (KeyError)

```python:executable
mon_dictionnaire = {"nom": "Alice", "age": 16}
print("Dictionnaire:", mon_dictionnaire)
print("Ville:", mon_dictionnaire["ville"])  # Cette clé n'existe pas
```

## Mélange de sortie normale et d'erreur

```python:executable
print("Ligne 1 - OK")
print("Ligne 2 - OK")
print("Ligne 3 - OK")

# Maintenant une erreur
x = 10 / 0

print("Cette ligne ne s'affichera pas")
```

## Code corrigé avec gestion d'erreur

```python:executable
print("Démonstration avec try/except")

try:
    x = 10
    y = 0
    resultat = x / y
    print(f"Résultat: {resultat}")
except ZeroDivisionError:
    print("⚠️ Erreur: Division par zéro impossible!")
    print("Le programme continue malgré l'erreur")

print("✅ Fin du programme")
```
