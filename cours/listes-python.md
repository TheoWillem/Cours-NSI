# Les Listes en Python

## Qu'est-ce qu'une liste ?

Une **liste** est une structure de données qui permet de stocker plusieurs valeurs dans une seule variable. En Python, les listes sont définies avec des crochets `[]`.

## Créer une liste

```python:executable
# Liste de nombres
nombres = [1, 2, 3, 4, 5]
print("Liste de nombres:", nombres)

# Liste de chaînes de caractères
fruits = ["pomme", "banane", "orange"]
print("Liste de fruits:", fruits)

# Liste mixte
mixte = [1, "deux", 3.0, True]
print("Liste mixte:", mixte)

# Liste vide
vide = []
print("Liste vide:", vide)
```

## Accéder aux éléments

On accède aux éléments d'une liste par leur **index** (position). ⚠️ Attention : le premier élément est à l'index 0 !

```python:executable
animaux = ["chat", "chien", "oiseau", "poisson"]

# Accéder au premier élément (index 0)
print("Premier animal:", animaux[0])

# Accéder au deuxième élément (index 1)
print("Deuxième animal:", animaux[1])

# Accéder au dernier élément (index -1)
print("Dernier animal:", animaux[-1])

# Accéder à l'avant-dernier élément (index -2)
print("Avant-dernier animal:", animaux[-2])
```

## Modifier une liste

Les listes sont **mutables**, c'est-à-dire qu'on peut les modifier après leur création.

```python:executable
couleurs = ["rouge", "vert", "bleu"]
print("Liste initiale:", couleurs)

# Modifier un élément
couleurs[1] = "jaune"
print("Après modification:", couleurs)

# Ajouter un élément à la fin
couleurs.append("violet")
print("Après ajout:", couleurs)

# Insérer un élément à une position
couleurs.insert(0, "orange")
print("Après insertion:", couleurs)

# Supprimer un élément
couleurs.remove("bleu")
print("Après suppression:", couleurs)
```

## Opérations sur les listes

```python:executable
liste1 = [1, 2, 3]
liste2 = [4, 5, 6]

# Longueur d'une liste
print("Longueur de liste1:", len(liste1))

# Concaténer deux listes
liste3 = liste1 + liste2
print("Concaténation:", liste3)

# Répéter une liste
liste4 = liste1 * 3
print("Répétition:", liste4)

# Vérifier si un élément est dans la liste
print("Est-ce que 2 est dans liste1 ?", 2 in liste1)
print("Est-ce que 10 est dans liste1 ?", 10 in liste1)
```

## Parcourir une liste

```python:executable
notes = [15, 12, 18, 14, 16]

# Méthode 1 : Parcourir les éléments
print("Les notes sont :")
for note in notes:
    print(f"- {note}/20")

# Méthode 2 : Parcourir avec l'index
print("\nAvec les indices :")
for i in range(len(notes)):
    print(f"Note n°{i+1} : {notes[i]}/20")

# Calculer la moyenne
moyenne = sum(notes) / len(notes)
print(f"\nMoyenne : {moyenne:.2f}/20")
```

## Les slices (tranches)

On peut extraire une partie d'une liste avec la notation `[début:fin]` :

```python:executable
nombres = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# Extraire du début à l'index 5 (exclu)
print("nombres[0:5] =", nombres[0:5])

# Extraire de l'index 3 à la fin
print("nombres[3:] =", nombres[3:])

# Extraire jusqu'à l'index 7 (exclu)
print("nombres[:7] =", nombres[:7])

# Extraire avec un pas de 2
print("nombres[::2] =", nombres[::2])

# Inverser une liste
print("nombres[::-1] =", nombres[::-1])
```

## Exercice : Traiter une liste de températures

```python:executable
# Températures de la semaine (en °C)
temperatures = [12, 15, 13, 18, 20, 17, 14]
jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]

# Afficher les températures
print("Températures de la semaine :")
for i in range(len(temperatures)):
    print(f"{jours[i]}: {temperatures[i]}°C")

# Calculer la température minimale
temp_min = min(temperatures)
print(f"\nTempérature minimale : {temp_min}°C")

# Calculer la température maximale
temp_max = max(temperatures)
print(f"Température maximale : {temp_max}°C")

# Calculer la température moyenne
temp_moyenne = sum(temperatures) / len(temperatures)
print(f"Température moyenne : {temp_moyenne:.1f}°C")
```

## Méthodes utiles des listes

```python:executable
ma_liste = [3, 1, 4, 1, 5, 9, 2, 6]
print("Liste initiale:", ma_liste)

# Trier la liste
ma_liste.sort()
print("Liste triée:", ma_liste)

# Inverser la liste
ma_liste.reverse()
print("Liste inversée:", ma_liste)

# Compter les occurrences d'un élément
print("Nombre de fois que 1 apparaît:", ma_liste.count(1))

# Trouver l'index d'un élément
print("Index de 5:", ma_liste.index(5))

# Supprimer le dernier élément
dernier = ma_liste.pop()
print(f"Dernier élément supprimé: {dernier}")
print("Liste après pop():", ma_liste)
```

## À retenir

- Les listes se créent avec `[]`
- L'indexation commence à 0
- Les listes sont mutables (modifiables)
- On peut parcourir une liste avec une boucle `for`
- De nombreuses méthodes existent : `append()`, `remove()`, `sort()`, etc.
