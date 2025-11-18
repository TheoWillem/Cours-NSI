# Site de Cours NSI

Un site web interactif pour vos cours de NSI avec support Markdown, Monaco Editor et PyScript.

## 🚀 Fonctionnalités

- ✍️ **Rédaction en Markdown** : Écrivez vos cours en Markdown simple
- 💻 **Éditeur de code intégré** : Monaco Editor (le même que VS Code)
- 🐍 **Exécution de code Python** : PyScript pour exécuter Python dans le navigateur
- 🎨 **Interface moderne** : Design responsive et agréable
- 📚 **Navigation facile** : Menu latéral pour accéder aux différents cours

## 📁 Structure du projet

```
testSiteWebCours/
├── index.html          # Page principale
├── style.css           # Styles CSS
├── app.js              # Logique JavaScript
├── README.md           # Ce fichier
└── cours/              # Dossier contenant vos cours
    ├── index.json      # Liste des cours
    ├── introduction-python.md
    ├── listes-python.md
    └── fonctions.md
```

## 🎯 Comment ajouter un cours

### 1. Créer un fichier Markdown

Créez un fichier `.md` dans le dossier `cours/`. Par exemple : `cours/mon-nouveau-cours.md`

### 2. Rédiger le cours

Utilisez la syntaxe Markdown classique :

```markdown
# Titre principal

## Section

Votre contenu ici...

### Sous-section

Du texte, des listes, etc.
```

### 3. Ajouter des blocs de code exécutables

Pour créer un bloc de code Python exécutable, utilisez la syntaxe :

````markdown
```python:executable
print("Ce code peut être modifié et exécuté !")
x = 10
y = 20
print(f"La somme est : {x + y}")
```
````

Pour un bloc de code simple (non exécutable) :

````markdown
```python
# Juste du code à afficher
def exemple():
    pass
```
````

### 4. Mettre à jour l'index

Ajoutez votre cours dans `cours/index.json` :

```json
[
    {
        "title": "Mon Nouveau Cours",
        "file": "mon-nouveau-cours.md"
    }
]
```

## 🌐 Lancer le site

Le site utilise des modules JavaScript, il faut donc le servir via un serveur HTTP.

### Option 1 : Python

```bash
cd testSiteWebCours
python3 -m http.server 8000
```

Puis ouvrez : http://localhost:8000

### Option 2 : Node.js (avec npx)

```bash
cd testSiteWebCours
npx serve
```

### Option 3 : Extension VS Code

Installez l'extension "Live Server" et cliquez sur "Go Live" en bas à droite.

## 📝 Syntaxe Markdown supportée

- Titres : `#`, `##`, `###`
- Gras : `**texte**`
- Italique : `*texte*`
- Listes : `-` ou `*` ou `1.`
- Code inline : `` `code` ``
- Blocs de code : ` ```language ` 
- Liens : `[texte](url)`
- Images : `![alt](url)`

## 🎨 Personnalisation

### Modifier les couleurs

Éditez les variables CSS dans `style.css` :

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    /* etc. */
}
```

### Ajouter des langages

Le site supporte actuellement Python, mais Monaco Editor supporte de nombreux langages. Modifiez `app.js` pour en ajouter d'autres.

## ⚠️ Limitations

- PyScript peut être un peu lent au premier chargement
- L'exécution de code se fait côté client (navigateur)
- Certaines bibliothèques Python peuvent ne pas être disponibles avec PyScript
- Les fichiers doivent être servis via HTTP (pas en `file://`)

## 📚 Exemples de cours inclus

Le site inclut 3 cours d'exemple :
1. **Introduction à Python** : Variables, types, opérations
2. **Les Listes** : Création, manipulation, parcours
3. **Les Fonctions** : Définition, paramètres, retour

Vous pouvez les modifier ou les supprimer selon vos besoins.

## 🆘 Dépannage

**Problème** : Les cours ne s'affichent pas
- Vérifiez que `cours/index.json` existe et est valide
- Assurez-vous que les chemins des fichiers sont corrects

**Problème** : Le code ne s'exécute pas
- Attendez que PyScript soit chargé (quelques secondes)
- Vérifiez la console du navigateur pour les erreurs

**Problème** : Monaco Editor ne s'affiche pas
- Vérifiez votre connexion internet (Monaco se charge depuis un CDN)
- Essayez de rafraîchir la page

## 📄 Licence

Libre d'utilisation pour l'enseignement !
