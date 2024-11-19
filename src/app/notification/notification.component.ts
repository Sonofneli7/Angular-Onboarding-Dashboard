import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  notification: string = '';
  private subscription: Subscription = Subscription.EMPTY; // Default to empty subscription

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    // Use 'notifications' if it's a property or method from the service
    this.subscription = this.notificationService.notifications.subscribe(
      (notification: string | null) => {
        if (notification) {
          this.notification = notification;
        } else {
          this.notification = '';  // Set to an empty string if it's null
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
