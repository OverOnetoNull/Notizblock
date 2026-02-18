// =========================
// DATENSTRUKTUREN (Arrays)
// =========================

// Aktive Notizen (parallel: Title und Text müssen IMMER gleich lang sein!)
let notesTitle = ["baba", "aufgabe erledigen"];
let notes = ["banana", "rasen mähen"];

// Papierkorb-Notizen (auch parallel)
let trashNotesTitle = [];
let trashNotes = [];

// =========================
// RENDER-FUNKTIONEN
// =========================

function renderNotes() {
  let contentRef = document.getElementById("content");
  contentRef.innerHTML = "";

  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderTrashNotes() {
  let contentRef = document.getElementById("trash_content");
  contentRef.innerHTML = "";

  for (
    let indexTrashNote = 0;
    indexTrashNote < trashNotes.length;
    indexTrashNote++
  ) {
    contentRef.innerHTML += getTrashNoteTemplate(indexTrashNote);
  }
}

// =========================
// TEMPLATE-FUNKTIONEN
// =========================

function getNoteTemplate(indexNote) {
  return `<p>
    + title: ${notesTitle[indexNote]} -> ${notes[indexNote]}
    <button onclick="toTrashNote(${indexNote})">X</button>
  </p>`;
}

function getTrashNoteTemplate(indexTrashNote) {
  return `<p>
    - title: ${trashNotesTitle[indexTrashNote]} -> ${trashNotes[indexTrashNote]}
    <button onclick="deleteNote(${indexTrashNote})">löschen</button>
  </p>`;
}

// =========================
// NOTE HINZUFÜGEN
// =========================

function addNote() {
  let noteInputRef = document.getElementById("note_input");
  let noteInput = noteInputRef.value.trim();

  if (noteInput === "") return;

  // FIX / HINWEIS:
  // Du hast notesTitle + notes. Deshalb musst du beim Hinzufügen BEIDE Arrays erweitern.
  // Da du in deinem HTML nur 1 Input hast, setzen wir den Titel automatisch.
  notesTitle.push("Ohne Titel");
  notes.push(noteInput);

  renderNotes();
  noteInputRef.value = "";
}

// =========================
// NOTE -> TRASH VERSCHIEBEN
// =========================

function toTrashNote(indexNote) {
  // splice gibt ein Array zurück -> mit [0] holen wir den String raus
  let removedNote = notes.splice(indexNote, 1)[0];
  let removedNoteTitle = notesTitle.splice(indexNote, 1)[0];

  // FEHLER in deinem Code war:
  // trashNotes.push(removedNote[0]);
  // removedNote ist schon String ("banana") -> removedNote[0] ist nur "b"
  trashNotes.push(removedNote);
  trashNotesTitle.push(removedNoteTitle);

  renderNotes();
  renderTrashNotes();
}

// =========================
// TRASH NOTE ENDGÜLTIG LÖSCHEN
// =========================

function deleteNote(indexTrashNote) {
  // WICHTIG:
  // Du musst Titel UND Text löschen, sonst verschiebt sich die Zuordnung!
  trashNotes.splice(indexTrashNote, 1);
  trashNotesTitle.splice(indexTrashNote, 1);

  renderTrashNotes();
}
