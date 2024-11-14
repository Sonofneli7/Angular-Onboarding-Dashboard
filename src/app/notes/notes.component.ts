import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';  // for routing
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { NoteCardComponent } from '../note-card/note-card.component'; // Import NoteCardComponent

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NgFor,CommonModule, RouterModule, NoteCardComponent],  // Add NoteCardComponent here
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']  // Ensure this is correct
})
export class NotesComponent implements OnInit {

  notes: Note[] = []; // Initialize notes as an empty array

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.notes = this.noteService.getNotes();
  }

}
