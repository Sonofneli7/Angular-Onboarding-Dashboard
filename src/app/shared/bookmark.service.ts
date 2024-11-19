import { Injectable, OnDestroy } from '@angular/core';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService implements OnDestroy{
  bookmarks: Bookmark[] = [];
  storageListenSub: any;

  constructor() {
    this.loadState();  // Load bookmarks from local storage on initialization
    this.updateFaviconFromStorage();  // Ensure the favicon is set based on the loaded bookmarks
  }
  ngOnDestroy(): void {
    if(this.storageListenSub) this.storageListenSub.unsubscribe();
  }

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
    this.saveState();  // Save state after adding a bookmark
    this.updateFavicon(bookmark.url.toString());  // Update favicon immediately after adding
  }

  // Method to update a bookmark by ID with partial fields
  updateBookmark(id: string, updatedFields: Partial<Bookmark>): void {
    const bookmark = this.getBookmark(id);
    if (bookmark) {
      Object.assign(bookmark, updatedFields); // Update the bookmark with the provided fields
      this.saveState();  // Save state after updating a bookmark
      this.updateFavicon(bookmark.url.toString());  // Update favicon after updating
    } else {
      console.warn(`Bookmark with ID ${id} not found.`);
    }
  }

  // Method to delete a bookmark by ID
  deleteBookmark(bookmarkId: string): void {
    const index = this.bookmarks.findIndex((bookmark) => bookmark.id === bookmarkId);
    if (index !== -1) {
      this.bookmarks.splice(index, 1); // Remove the bookmark from the array
      this.saveState();  // Save state after deleting a bookmark
      console.log(`Bookmark with ID ${bookmarkId} deleted.`);
      // Optionally, reset favicon after deletion if it's the current one
      this.updateFaviconFromStorage();
    } else {
      console.error(`Bookmark with ID ${bookmarkId} not found.`);
    }
  }

  // Method to save the bookmarks to local storage
  saveState(): void {
    localStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
  }

  // Method to load bookmarks from local storage (optional, but useful if you want persistent data)
  loadState(): void {
    try {
      const bookmarksInStorage = JSON.parse(localStorage.getItem('bookmarks') || '[]'); // Provide default empty array if null
      if (Array.isArray(bookmarksInStorage)) {
        this.bookmarks = bookmarksInStorage; // Directly assign the loaded array
      } else {
        console.warn('Invalid bookmarks format in local storage. Resetting to empty.');
        this.bookmarks = [];
      }
    } catch (e) {
      console.error('Failed to load bookmarks from local storage:', e);
      this.bookmarks = []; // Reset to an empty array if an error occurs
    }
  }

  // Method to update the favicon dynamically based on a URL
  updateFavicon(url: string): void {
    const faviconUrl = this.getFaviconUrl(url);
    const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = faviconUrl; // Dynamically set favicon path

    // Ensure favicon is not cached (by adding a timestamp)
    link.href = `${faviconUrl}?timestamp=${new Date().getTime()}`;

    // Add link element to head
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  // Method to update favicon from the stored bookmarks (for page reloads)
  updateFaviconFromStorage(): void {
    // If there are bookmarks, update favicon to the first one in the list (or any custom logic)
    if (this.bookmarks.length > 0) {
      this.updateFavicon(this.bookmarks[0].url.toString());  // Use the first bookmark URL for favicon
    } else {
      console.warn('No bookmarks available to set favicon.');
    }
  }

  // Method to get the favicon URL (using Google Favicon API)
  getFaviconUrl(url: string): string {
    return `https://www.google.com/s2/favicons?domain=${url}`;  // Using Google Favicon API
  }
}
