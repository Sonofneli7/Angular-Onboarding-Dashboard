import { Routes } from '@angular/router';
import { BookmarksComponent } from './bookmarks/bookmarks.component';
//import { TodosComponent } from './todos/todos.component';
//import { NotesComponent } from './notes/notes.component';

export const routes: Routes = [
  { path: '/bookmarks', component: BookmarksComponent },
 // { path: 'todos', component: TodosComponent },
 // { path: 'notes', component: NotesComponent },
  //{ path: '', redirectTo: '/bookmarks', pathMatch: 'full' } // Default route
];
