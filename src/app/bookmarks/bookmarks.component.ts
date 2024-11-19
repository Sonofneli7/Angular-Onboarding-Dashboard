import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';  // for routing
import { BookmarkTileComponent } from "../bookmark-tile/bookmark-tile.component";
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [NgFor, CommonModule, RouterModule, BookmarkTileComponent],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']  // Corrected here
})
export class BookmarksComponent implements OnInit {

  bookmarks: Bookmark[] = [];

  constructor(private bookmarkService: BookmarkService) { } 
  ngOnInit(): void {
    this.bookmarks = this.bookmarkService.getBookmarks()
  }
}




// ng s -o   Opens application automatically