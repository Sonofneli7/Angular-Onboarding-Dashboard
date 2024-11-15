import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  bookmarks: Bookmark[] = [
    new Bookmark('Eclipse', 'https://www.eclipse.org/'),
    new Bookmark('Google', 'https://www.google.com/'),
    new Bookmark('AWS', 'https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fus-east-1.console.aws.amazon.com%2Fconsole%2Fhome%3FhashArgs%3D%2523%26isauthcode%3Dtrue%26region%3Dus-east-1%26state%3DhashArgsFromTB_us-east-1_78e5d7fbc373d117&client_id=arn%3Aaws%3Asignin%3A%3A%3Aconsole%2Fcanvas&forceMobileApp=0&code_challenge=YCB1vnr8fmnfV9aaqIJ6xn644KmssSUHb4WkCKxIphs&code_challenge_method=SHA-256'),
    new Bookmark('YouTube', 'https://www.youtube.com/'),

  ];

  constructor() {}

  // Method to get all bookmarks
  getBookmarks(): Bookmark[] {
    return this.bookmarks;
  }

  // Method to get a single bookmark by ID (or another identifier)
  getBookmark(id: string): Bookmark | undefined {
    return this.bookmarks.find((b) => b.id === id);
  }

  // Method to add a new bookmark
  addBookmark(bookmark: Bookmark): void {
    this.bookmarks.push(bookmark);
  }

  // Method to update a bookmark by ID with partial fields
  updateBookmark(id: string, updatedFields: Partial<Bookmark>): void {
    const bookmark = this.getBookmark(id);
    if (bookmark) {
      Object.assign(bookmark, updatedFields); // Update the bookmark with the provided fields
    }
  }

  // Method to delete a bookmark by ID
  deleteBookmark(bookmarkId: string): void {
    // Assuming you're working with an array or similar structure
    const index = this.bookmarks.findIndex((bookmark) => bookmark.id === bookmarkId);
    if (index !== -1) {
      this.bookmarks.splice(index, 1); // Remove the bookmark from the array
      console.log(`Bookmark with ID ${bookmarkId} deleted.`);
    } else {
      console.error(`Bookmark with ID ${bookmarkId} not found.`);
    }
  }
}
