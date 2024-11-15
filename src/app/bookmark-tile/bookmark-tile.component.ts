import { Component, Input, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmark-tile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmark-tile.component.html',
  styleUrls: ['./bookmark-tile.component.scss']
})
export class BookmarkTileComponent implements OnInit {
  @Input() bookmark: Bookmark | undefined;

  tileIconSrc: string | undefined;
  faviconError: boolean = false;

  constructor() {}

  ngOnInit(): void {
    if (this.bookmark?.url) {
      this.tileIconSrc = this.bookmark.url.origin + '/favicon.ico';
    }
  }

  // Getter to safely access the bookmark name
  get name(): string {
    return this.bookmark?.name || 'Unnamed Bookmark'; // Default name if undefined
  }

  // Getter to retrieve the first letter of the bookmark name
  get firstLetter(): string {
    return this.name.charAt(0).toUpperCase(); // Get the first letter and convert it to uppercase
  }
}
