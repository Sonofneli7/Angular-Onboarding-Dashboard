import { Injectable, OnDestroy } from '@angular/core';
import { Note } from '../shared/note.model';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoteService implements OnDestroy{
  notes: Note[] = [];
 
  storageListenSub: Subscription | undefined

  constructor() {
    // Load note state from local storage
    this.loadState();

    // Listen to storage events related to notes
    this.storageListenSub = fromEvent<StorageEvent>(window, 'storage')
      .pipe(filter((event) => event.key === 'notes')) // Ensure we only handle events for 'notes'
      .subscribe(() => {
        this.loadState(); // Reload notes from storage when the 'notes' key changes
      });
  }
  ngOnDestroy(): void {
   if (this.storageListenSub) this.storageListenSub.unsubscribe();
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
      this.saveState(); // Ensure state is saved after deletion
    } else {
      console.warn(`Note with id ${id} not found`);
    }
  }

  // Save notes to local storage
  saveState(): void {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }

  // Load notes from local storage
  loadState(): void {
    try {
      const notesInStorage = JSON.parse(localStorage.getItem('notes') ?? '[]');
      if (Array.isArray(notesInStorage)) {
        this.notes.length = 0; // clear the notes array (while keeping the reference)
        this.notes.push(...notesInStorage);
      }
    } catch (e) {
      console.error('Failed to load notes from local storage:', e);
      this.notes = []; // Reset to empty if there's an error
    }
  }
}
