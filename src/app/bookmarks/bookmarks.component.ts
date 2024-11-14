import { Component } from '@angular/core';
import { BookmarkTileComponent } from "../bookmark-tile/bookmark-tile.component";

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [BookmarkTileComponent],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']  // Corrected here
})
export class BookmarksComponent {}



// ng s -o   Opens application automatically