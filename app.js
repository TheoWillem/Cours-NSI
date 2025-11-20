// Configuration
const COURS_FOLDER = 'cours';

// État de l'application
let currentCourse = null;
let editors = [];

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
    await loadCourseList();
    loadMonacoAndPyScript();
});

// Charger la liste des cours
async function loadCourseList() {
    try {
        const response = await fetch(`${COURS_FOLDER}/index.json`);
        const courses = await response.json();
        
        const courseList = document.getElementById('course-list');
        courseList.innerHTML = '';
        
        courses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = course.title;
            li.dataset.file = course.file;
            li.addEventListener('click', () => loadCourse(course.file));
            courseList.appendChild(li);
        });
    } catch (error) {
        console.error('Erreur lors du chargement de la liste des cours:', error);
        document.getElementById('course-list').innerHTML = 
            '<li style="padding: 1rem; color: #ef4444;">Aucun cours disponible. Créez un fichier index.json dans le dossier cours/</li>';
    }
}

// Charger un cours
async function loadCourse(filename) {
    try {
        const response = await fetch(`${COURS_FOLDER}/${filename}`);
        const markdown = await response.text();
        
        // Mettre à jour la navigation
        document.querySelectorAll('.course-list li').forEach(li => {
            li.classList.remove('active');
            if (li.dataset.file === filename) {
                li.classList.add('active');
            }
        });
        
        // Cacher le message de bienvenue et afficher le contenu
        document.querySelector('.welcome').style.display = 'none';
        const contentDiv = document.getElementById('course-content');
        contentDiv.style.display = 'block';
        
        // Convertir et afficher le cours
        await renderCourse(markdown, contentDiv);
        currentCourse = filename;
        
        // Scroll vers le haut
        document.querySelector('.content').scrollTop = 0;
    } catch (error) {
        console.error('Erreur lors du chargement du cours:', error);
        alert('Erreur lors du chargement du cours');
    }
}

// Rendre le cours avec gestion des blocs de code exécutables
async function renderCourse(markdown, container) {
    // Traiter les sections déroulantes AVANT de parser le markdown
    markdown = processDetailsBlocks(markdown);
    
    // Parser le markdown avec marked
    let html = marked.parse(markdown);
    
    // Créer un élément temporaire pour manipuler le HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;
    
    // Trouver tous les blocs de code
    const codeBlocks = temp.querySelectorAll('pre code');
    let executableBlockIndex = 0;
    
    codeBlocks.forEach((codeBlock) => {
        const className = codeBlock.className;
        const code = codeBlock.textContent;
        
        // Vérifier si c'est un bloc exécutable (language-python:executable)
        if (className.includes('language-python') && className.includes('executable')) {
            const blockId = `code-block-${executableBlockIndex++}`;
            const container = createExecutableCodeBlock(code, blockId);
            codeBlock.parentElement.replaceWith(container);
        }
    });
    
    // Mettre à jour le contenu
    container.innerHTML = temp.innerHTML;
    
    // Ajouter des gestionnaires d'événements pour les liens internes
    setupInternalLinks(container);
    
    // Initialiser Monaco pour chaque bloc exécutable
    await initializeMonacoEditors();
}

// Gérer les liens internes vers d'autres cours
function setupInternalLinks(container) {
    const links = container.querySelectorAll('a[href$=".md"]');
    links.forEach(link => {
        const href = link.getAttribute('href');
        // Extraire juste le nom du fichier (enlever ./ ou ../)
        const filename = href.replace(/^\.\.?\//, '');
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            loadCourse(filename);
        });
        
        // Ajouter une classe pour le style
        link.classList.add('internal-link');
    });
}

// Compteur pour générer des ID uniques
let detailsCounter = 0;

// Traiter les blocs déroulants ::: details
function processDetailsBlocks(markdown) {
    // Réinitialiser le compteur à chaque traitement
    detailsCounter = 0;
    
    const lines = markdown.split('\n');
    const result = [];
    let i = 0;
    
    while (i < lines.length) {
        const line = lines[i];
        
        // Détecter le début d'une section :::details
        if (line.trim().startsWith(':::details')) {
            const title = line.replace(/^:::details\s+/, '').trim();
            const detailsId = `details-${++detailsCounter}`;
            
            // Collecter le contenu jusqu'au prochain ::: seul sur une ligne
            const contentLines = [];
            i++; // Passer à la ligne suivante
            
            while (i < lines.length) {
                const currentLine = lines[i];
                // Vérifier si c'est une ligne avec UNIQUEMENT :::
                if (currentLine.trim() === ':::') {
                    break;
                }
                contentLines.push(currentLine);
                i++;
            }
            
            // Convertir le contenu markdown en HTML
            const content = contentLines.join('\n').trim();
            const contentHtml = content ? marked.parse(content) : '';
            
            // Générer le HTML de la section déroulante (tout sur une ligne pour éviter les problèmes)
            result.push(`<div class="details-section" id="${detailsId}"><div class="details-header" onclick="toggleDetails('${detailsId}')"><span class="details-icon">▶</span><span>${title}</span></div><div class="details-content"><div class="details-body">${contentHtml}</div></div></div>`);
            
            // Sauter le ::: de fermeture
            if (i < lines.length && lines[i].trim() === ':::') {
                i++;
            }
        } else {
            // Ligne normale, la garder telle quelle
            result.push(line);
            i++;
        }
    }
    
    return result.join('\n');
}

// Créer un bloc de code exécutable
function createExecutableCodeBlock(code, blockId) {
    const container = document.createElement('div');
    container.className = 'code-block-container';
    container.innerHTML = `
        <div class="code-block-header">
            <div class="code-block-title">
                🐍 Code Python Exécutable
            </div>
            <div class="code-block-actions">
                <button class="btn btn-reset" onclick="resetCode('${blockId}')">
                    ↺ Réinitialiser
                </button>
                <button class="btn btn-run" onclick="runCode('${blockId}')">
                    ▶ Exécuter
                </button>
            </div>
        </div>
        <div id="${blockId}-editor" class="monaco-editor-container"></div>
        <div id="${blockId}-output" class="code-output empty">
            Cliquez sur "Exécuter" pour voir le résultat...
        </div>
    `;
    
    // Stocker le code original
    container.dataset.originalCode = code;
    container.dataset.blockId = blockId;
    
    return container;
}

// Charger Monaco Editor et PyScript
function loadMonacoAndPyScript() {
    // Charger Monaco Editor
    const monacoScript = document.createElement('script');
    monacoScript.src = 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/loader.js';
    monacoScript.onload = () => {
        require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
    };
    document.head.appendChild(monacoScript);
    
    // Charger PyScript
    const pyScriptLink = document.createElement('link');
    pyScriptLink.rel = 'stylesheet';
    pyScriptLink.href = 'https://pyscript.net/releases/2024.1.1/core.css';
    document.head.appendChild(pyScriptLink);
    
    const pyScriptScript = document.createElement('script');
    pyScriptScript.type = 'module';
    pyScriptScript.src = 'https://pyscript.net/releases/2024.1.1/core.js';
    document.head.appendChild(pyScriptScript);
}

// Initialiser les éditeurs Monaco
async function initializeMonacoEditors() {
    return new Promise((resolve) => {
        require(['vs/editor/editor.main'], function() {
            editors = [];
            
            document.querySelectorAll('.code-block-container').forEach((container) => {
                const blockId = container.dataset.blockId;
                const code = container.dataset.originalCode;
                const editorDiv = document.getElementById(`${blockId}-editor`);
                
                if (editorDiv && !editorDiv.dataset.initialized) {
                    const editor = monaco.editor.create(editorDiv, {
                        value: code,
                        language: 'python',
                        theme: 'vs-dark',
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true
                    });
                    
                    editors.push({ blockId, editor, originalCode: code });
                    editorDiv.dataset.initialized = 'true';
                }
            });
            
            resolve();
        });
    });
}

// Exécuter le code
async function runCode(blockId) {
    const editorData = editors.find(e => e.blockId === blockId);
    if (!editorData) return;
    
    const code = editorData.editor.getValue();
    const outputDiv = document.getElementById(`${blockId}-output`);
    
    outputDiv.innerHTML = '<div style="color: #64748b;">⏳ Exécution en cours...</div>';
    outputDiv.classList.remove('empty');
    
    try {
        // Créer un élément PyScript temporaire pour exécuter le code
        const pyScriptElement = document.createElement('script');
        pyScriptElement.type = 'py';
        
        // Capturer la sortie et les erreurs
        const captureCode = `
import sys
import traceback
from io import StringIO

# Capturer stdout et stderr
output_buffer = StringIO()
error_buffer = StringIO()
sys.stdout = output_buffer
sys.stderr = error_buffer

has_error = False

try:
${code.split('\n').map(line => '    ' + line).join('\n')}
except Exception as e:
    has_error = True
    # Capturer le traceback complet
    traceback.print_exc(file=error_buffer)
finally:
    # Restaurer stdout et stderr
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__
    
# Obtenir les sorties
output_text = output_buffer.getvalue()
error_text = error_buffer.getvalue()
output_buffer.close()
error_buffer.close()

# Afficher dans le div de sortie
from js import document
output_div = document.getElementById("${blockId}-output")

html_parts = []

# Ajouter la sortie normale
if output_text:
    lines = output_text.strip().split('\\n')
    for line in lines:
        html_parts.append(f'<div class="output-line">{line}</div>')

# Ajouter les erreurs
if error_text:
    error_lines = error_text.strip().split('\\n')
    for line in error_lines:
        html_parts.append(f'<div class="output-error">{line}</div>')

# Afficher le résultat
if html_parts:
    output_div.innerHTML = '\\n'.join(html_parts)
else:
    output_div.innerHTML = '<div class="output-line" style="color: #64748b; font-style: italic;">Aucune sortie</div>'
`;
        
        pyScriptElement.textContent = captureCode;
        document.body.appendChild(pyScriptElement);
        
        // Nettoyer après un délai
        setTimeout(() => {
            document.body.removeChild(pyScriptElement);
        }, 100);
        
    } catch (error) {
        outputDiv.innerHTML = `<div class="output-error">❌ Erreur JavaScript: ${error.message}</div>`;
    }
}

// Réinitialiser le code
function resetCode(blockId) {
    const editorData = editors.find(e => e.blockId === blockId);
    if (!editorData) return;
    
    editorData.editor.setValue(editorData.originalCode);
    
    const outputDiv = document.getElementById(`${blockId}-output`);
    outputDiv.innerHTML = 'Cliquez sur "Exécuter" pour voir le résultat...';
    outputDiv.classList.add('empty');
}

// Ouvrir/fermer les sections déroulantes
function toggleDetails(detailsId) {
    const section = document.getElementById(detailsId);
    if (section) {
        section.classList.toggle('open');
    }
}
