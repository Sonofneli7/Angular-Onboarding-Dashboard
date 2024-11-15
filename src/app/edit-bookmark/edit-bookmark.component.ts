import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router, RouterModule } from '@angular/router';
import { BookmarkService } from '../shared/bookmark.service';
import { Bookmark } from '../shared/bookmark.model';

@Component({
  selector: 'app-edit-bookmark',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss'],
})
export class EditBookmarkComponent implements OnInit {
  showValidationErrors = false;
  bookmark: Bookmark | null | undefined = null;

  constructor(
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Fetch the bookmark based on the route parameter
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const bookmarkId = paramMap.get('id');
      if (bookmarkId) {
        this.bookmark = this.bookmarkService.getBookmark(bookmarkId);
      }
    });
  }

  onFormSubmit(form: NgForm): void {
    if (this.bookmark?.id) {
      const { name, url } = form.value;
      this.bookmarkService.updateBookmark(this.bookmark.id, {
        name,
        url: new URL(url),
      });
    } else {
      console.error('Bookmark ID is missing');
    }
  }

  deleteBookmark(): void {
    if (this.bookmark?.id) {
      const bookmarkId = this.bookmark.id;
      this.bookmarkService.deleteBookmark(bookmarkId);
      this.bookmark = null; 
      this.router.navigate(['../'], {relativeTo: this.route}); 
    } else {
      console.error('No bookmark to delete');
    }
  }
}
