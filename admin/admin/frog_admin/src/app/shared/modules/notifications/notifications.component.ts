import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification, NotificationType  } from '../../services';

@Component({
    selector: 'app-notification',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    notifications: Notification[] = [];
    constructor(
        private service: NotificationService
    ) { }

    ngOnInit() {
        this.service.getNotifications().subscribe((notification: Notification) => {
            if (!notification) {
                this.notifications = [];
                return;
            }
            this.notifications.push(notification);
            this.clear();
        });
    }

    clear() {
        let self = this;
        let newNotif = [];
        let interval = setInterval(function () {
            let now = new Date();
            for (let i in self.notifications) {
                if(self.notifications[i]){
                    if(self.notifications[i]['expiration'] < now.getTime()){
                        self.removeNotification(self.notifications[i]);
                    }
                }
            }
        }, 100);
    }

    removeNotification(notification: Notification) {
        this.notifications = this.notifications.filter(x => x !== notification);
    }

    notificationClass(notification: Notification) {
        if (!notification) {
            return;
        }

        switch (notification.type) {
            case NotificationType.Success:
                return 'success';
            case NotificationType.Error:
                return 'danger';
            case NotificationType.Info:
                return 'info';
            case NotificationType.Warning:
                return 'warning';
            case NotificationType.Cookies:
                return 'cookies';
        }
    }

    notificationClose(notification: Notification) {
        if (!notification || notification.type != NotificationType.Cookies) {
            return;
        } else {
            return 'flaticon-delete';
        }
    }
}
