import { v4 as uuidv4 } from 'uuid';

export class Todo {
  id: string;
  completed: boolean;
  noteId: string; // Reference to the note

  constructor(public text: string) {
    this.id = uuidv4();
    this.completed = false;
    this.noteId = ''; // Initialize noteId with an empty string or some default value
  }
}