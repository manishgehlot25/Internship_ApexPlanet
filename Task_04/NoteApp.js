const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteNote(index);

        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function addNote() {
    const note = noteInput.value.trim();
    if (note) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        saveNotes(notes);
        noteInput.value = '';
        loadNotes();
    }
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    saveNotes(notes);
    loadNotes();
}

// Load notes on page load
document.addEventListener('DOMContentLoaded', loadNotes);

const colorPicker = document.getElementById('colorPicker');
const themeToggle = document.getElementById('toggleTheme');

let editingIndex = null;

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note.text;
        li.style.borderLeft = `5px solid ${note.color}`;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        // editBtn.style.background = '#00c6ff';
        editBtn.style.marginRight = '5px';
        editBtn.onclick = () => editNote(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteNote(index);

        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function addOrUpdateNote() {
    const text = noteInput.value.trim();
    const color = colorPicker.value;
    if (!text) return;

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    if (editingIndex !== null) {
        notes[editingIndex] = { text, color };
        editingIndex = null;
    } else {
        notes.push({ text, color });
    }

    saveNotes(notes);
    noteInput.value = '';
    loadNotes();
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    saveNotes(notes);
    loadNotes();
}

function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    noteInput.value = notes[index].text;
    colorPicker.value = notes[index].color;
    editingIndex = index;
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

function loadTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadNotes();
    themeToggle.addEventListener('click', toggleTheme);
});

