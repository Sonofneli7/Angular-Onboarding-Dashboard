import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-note',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
  showValidationErrors: boolean = false;
  note: Note | null = null;

  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Subscribe to the route's paramMap to get the 'id' parameter
    this.route.paramMap.subscribe((paramMap) => {
      const idParam = paramMap.get('id');
      if (!idParam) {
        this.router.navigate(['/']); // Handle case where id is not available
        return;
      }

      // Assuming the getNote method fetches a note by ID
      const note = this.noteService.getNote(idParam);
      if (note) {
        this.note = { ...note }; // Clone the note to avoid mutating the original
      } else {
        this.router.navigate(['/']); // Navigate to the notes list if note not found
      }
    });
  }

  onFormSubmit(form: NgForm) {
    this.showValidationErrors = form.invalid ?? false;
    if (form.invalid) return;

    if (this.note) {
      // Extract the necessary fields for updating
      const updatedFields: Partial<Note> = {
        title: this.note.title,
        content: this.note.content,
      };

      this.noteService.updateNote(this.note.id?? '', updatedFields); // Pass both ID and updated fields
      this.router.navigateByUrl('/notes');
    }
  }
}
