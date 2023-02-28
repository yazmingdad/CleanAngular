import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Command,
  NotificationsService,
} from 'src/app/core/service/notifications.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent {
  messages: Command[];
  constructor(private notificationService: NotificationsService) {
    this.notificationService.output$.subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: () => {},
    });
  }

  clearMessage(id: number) {
    this.notificationService.clearMessage(id);
  }
}
