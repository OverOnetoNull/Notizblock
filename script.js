// notizen anzeigen lassen

let notes = ["banana", "rasen mähen"];

let trashNotes = [];

function renderNotes() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = ""; // reset content

  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote); // += means: update the content with new  value
  }
}
function renderTrashNotes() {
  let contentRef = document.getElementById("trash_content");
  contentRef.innerHTML = ""; // reset content

  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length;
    indexTrashNote++
  ) {
    contentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
  }
}

function getNoteTemplate(indexNote) {
  return `<p>+ ${notes[indexNote]}<button onclick="deleteNote(${indexNote})">X</button></p>`;
}

function getTrashNoteTemplate(indexTrashNote) {
  return `<p>- ${notes[indexTrashNote]}<button onclick="restoreNote(${indexTrashNote})">Wiederherstellen</button></p>`;
}

// notizen hinzufügen

function addNote() {
  let noteInputRef = document.getElementById("note_input");
  let noteInput = noteInputRef.value;

  notes.push(noteInput);
  renderNotes();

  noteInputRef.value = ""; // reset input field
}

// eingabe löschen

function deleteNote(indexNote) {
  let trashNote = notes.splice(indexNote, 1);
  trashNotes.push(trashNote);

  renderNotes();
  renderTrashNotes();
}

// notizen löschen
// notizen archivieren
