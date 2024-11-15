// app.component.ts
import { Component, OnInit } from '@angular/core';
import { BookmarkService } from './shared/bookmark.service';
import { Bookmark } from './shared/bookmark.model';
import { RouterModule } from '@angular/router'; // <-- Import RouterModule
import { TabsComponent } from './tabs/tabs.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TabsComponent,EditTodoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  bookmarks: Bookmark[] = [];

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks();
  }
}
