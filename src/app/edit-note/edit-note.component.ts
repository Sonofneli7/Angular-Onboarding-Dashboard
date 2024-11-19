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
  note = {
    id: '',
    title: '',
    content: '',
  };

  constructor(
    private noteService: NoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const idParam = paramMap.get('id');
      if (!idParam) {
        this.router.navigate(['/']);
        return;
      }

      const note = this.noteService.getNote(idParam); // Retrieve note by id
      if (note) {
        this.note = { ...note };
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  onFormSubmit(form: NgForm) {
    this.showValidationErrors = form.invalid ?? false;
    if (form.invalid) return;

    if (this.note) {
      const updatedFields: Partial<Note> = {
        title: this.note.title,
        content: this.note.content,
      };

      this.noteService.updateNote(this.note.id ?? '', updatedFields);
      this.router.navigateByUrl('/notes');
    }
  }

  deleteNote() {
    if (this.note && this.note.id) {
      this.noteService.deleteNote(this.note.id);
      this.saveState();
      this.router.navigateByUrl('/notes');
    }
  }
  saveState() {
    const notes = this.noteService.getNotes();
    localStorage.setItem('notes', JSON.stringify(notes));
  }
}
