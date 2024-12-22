const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const addNoteBtn = document.getElementById('add-note');
const error = document.getElementById('error');
const apiUrl = 'http://localhost:3000/notes';
const xhr = new XMLHttpRequest();

index();

/********************** Event Functions ***************** */

function index() {
    xhr.open('GET', apiUrl);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status === 200) {
            const notes = JSON.parse(xhr.responseText);
            const notesContainer = document.getElementById('notes');
            notesContainer.innerHTML = '';
            notes.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.classList.add('note');
                noteElement.innerHTML = `
                        <div class="note-title">${note.title}</div>
                        <div class="note-content">${note.content}</div>
                        <div class="actions">
                            <button class="edit" data-id=${note.id} onclick="editNote(event)">Edit</button>
                            <button class="delete" data-id=${note.id} onclick="deleteNote(event)">Delete</button>
                        </div>
                    `;
                notesContainer.appendChild(noteElement);
            });
        }
    };
}

function addNote() {
    xhr.open('POST', apiUrl);
    storeNote(xhr);
}

function updateNote(id) {
    xhr.open('PUT', `${apiUrl}/${id}`, true);
    storeNote(xhr);
}

function deleteNote(event) {
    const id = event.target.dataset.id;
    xhr.open('DELETE', `${apiUrl}/${id}`);
    xhr.send();
    xhr.onload = index;
}

function editNote(event) {
    const id = event.target.dataset.id;
    xhr.open('GET', `${apiUrl}/${id}`);
    xhr.send();
    xhr.onload = function () {
        if (xhr.status === 200) {
            const note = JSON.parse(xhr.responseText);
            fillForm(note);
            addNoteBtn.innerHTML = 'Update Note';
            addNoteBtn.onclick = function () {
                updateNote(id);
            };
        }
    };
}

/********************** Helper Functions ***************** */

function storeNote(xhr) {
    if (validateInputs()) {
        data = {
            title: titleInput.value,
            content: contentInput.value
        }
        xhr.send(JSON.stringify(data));
        xhr.onload = clearForm;
    } else {
        showError('Title must be at least 5 characters and content must be at least 20 characters');
    }
}

function validateInputs() {
    const title = titleInput.value;
    const content = contentInput.value;
    return title.length > 5 && content.length > 19;
}

function fillForm(note) {
    titleInput.value = note.title;
    contentInput.value = note.content;
}

function clearForm() {
    titleInput.value = '';
    contentInput.value = '';
    error.style.display = 'none';
    index();
}

function showError(message) {
    error.innerHTML = message;
    error.style.display = 'block';
}
