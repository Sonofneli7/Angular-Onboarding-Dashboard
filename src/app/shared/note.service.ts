import { Injectable } from '@angular/core';
import { Note } from '../shared/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  notes: Note[] = [];

  constructor() {
    //Load note state from local storage
    this.loadState();
  }

  // Get all notes
  getNotes(): Note[] {
    return this.notes;
  }

  // Get a specific note by id
  getNote(id: string): Note | undefined {
    return this.notes.find((n) => n.id === id);
  }

  // Add a new note
  addNote(note: Note): void {
    this.notes.push(note);
    this.saveState();
  }

  // Update an existing note by id
  updateNote(id: string, updatedFields: Partial<Note>): void {
    const note = this.getNote(id);
    if (note) {
      Object.assign(note, updatedFields); // Safely update the fields of the note
      this.saveState();
    } else {
      console.warn(`Note with id ${id} not found`);
    }
  }

  // Method to delete a note
  deleteNote(id: string): void {
    const noteIndex = this.notes.findIndex((n) => n.id === id);
    if (noteIndex !== -1) {
      this.notes.splice(noteIndex, 1); // Remove the note from the array
    }
  }

  saveState() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  loadState() {
    try {
      const notesInStorage = JSON.parse(localStorage.getItem('notes') ?? '[]');
      if (!notesInStorage) return;
      this.notes = notesInStorage;
    } catch (e) {
      console.error('Failed to load notes from local storage');
      console.error(e);
    }
  }
}
