// =========================
// DATENSTRUKTUREN (Arrays)
// =========================

// Aktive Notizen
let notes = ["banana", "rasen mähen"];

// (Optional später) Archiv: du hattest es schon angelegt,
// aber in deinem HTML gibt es keinen Archiv-Bereich.
// Deshalb lassen wir es hier erstmal weg oder ungenutzt.
let archiveNotes = [];

// Papierkorb-Notizen
let trashNotes = [];

// =========================
// RENDER-FUNKTIONEN
// =========================

function renderNotes() {
  // Holt das HTML-Element, in das die Notes gerendert werden sollen
  let contentRef = document.getElementById("content");

  // Inhalt leeren, sonst würdest du beim Neurendern immer doppelt anzeigen
  contentRef.innerHTML = "";

  // Alle Notizen durchlaufen und HTML zusammenbauen
  for (let indexNote = 0; indexNote < notes.length; indexNote++) {
    contentRef.innerHTML += getNoteTemplate(indexNote);
  }
}

function renderTrashNotes() {
  // Holt das HTML-Element, in das die Trash-Notes gerendert werden sollen
  let contentRef = document.getElementById("trash_content");

  // Reset
  contentRef.innerHTML = "";

  // Alle Trash-Notizen durchlaufen
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
  // Note hat Button: X -> verschiebt in den Papierkorb
  return `<p>+ ${notes[indexNote]} <button onclick="toTrashNote(${indexNote})">X</button></p>`;
}

function getTrashNoteTemplate(indexTrashNote) {
  // Trash hat Button: löschen -> endgültig entfernen
  return `<p>- ${trashNotes[indexTrashNote]} <button onclick="deleteNote(${indexTrashNote})">löschen</button></p>`;
}

// =========================
// NOTE HINZUFÜGEN
// =========================

function addNote() {
  let noteInputRef = document.getElementById("note_input");
  let noteInput = noteInputRef.value;

  // Optional: Leere Eingaben verhindern
  // (damit nicht "" in deinen Notes landet)
  noteInput = noteInput.trim();
  if (noteInput === "") return;

  // Neue Notiz ans Ende der Liste
  notes.push(noteInput);

  // Neu rendern, damit sie sichtbar wird
  renderNotes();

  // Inputfeld leeren
  noteInputRef.value = "";
}

// =========================
// NOTE -> TRASH VERSCHIEBEN
// =========================

function toTrashNote(indexNote) {
  // WICHTIG: splice liefert IMMER ein Array zurück (auch wenn du 1 Element entfernst)
  // Beispiel: notes.splice(0, 1) -> ["banana"]
  // Du willst aber den String "banana" -> deshalb [0]
  let removedNote = notes.splice(indexNote, 1)[0];

  // In den Papierkorb verschieben
  trashNotes.push(removedNote);

  // Beide Bereiche neu rendern
  renderNotes();
  renderTrashNotes();
}

// =========================
// TRASH NOTE ENDGÜLTIG LÖSCHEN
// =========================

function deleteNote(indexTrashNote) {
  // Entfernt 1 Element aus dem Trash an der Position indexTrashNote
  trashNotes.splice(indexTrashNote, 1);

  // Trash neu rendern
  renderTrashNotes();
}
