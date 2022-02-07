import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subject, Observable } from 'rxjs';

export class Notification {
    type: NotificationType;
    title: string;
    message: string;
    expiration: number;
}

export enum NotificationType {
    Success,
    Error,
    Info,
    Warning,
    Cookies
}


@Injectable()
export class NotificationService {
    private subject = new Subject<Notification>();
    private keepAfterRouteChange = false;
    private expiration = 5000;

    constructor(
        private router: Router
    ) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear();
                }
            }
        });
    }

    showFromResponse(response){
        if(response.status === 401){
            localStorage.removeItem('user');
            this.router.navigate(['/login']);
        } else {
            let body = JSON.parse(response['_body']);
            if(body.error){
                this.show( this.getMessageFromCode(body.error), null, 'error');
            }
            if(body.message){
                this.show( this.getMessageFromCode(body.message), null, 'error');
            }
        }
    }

    showOne(message, type='success'){
        this.show(message, null, type);
    }

    getNotifications(): Observable<any> {
        return this.subject.asObservable();
    }

    show(message, title = null, type='success'){
        if(type == 'success'){
            this.success(title, message);
        }
        if(type == 'warning'){
            this.warn(title, message);
        }
        if(type == 'error'){
            this.error(title, message);
        }
    }

    success(title: string, message: string, keepAfterRouteChange = false) {
        this.notification(NotificationType.Success, message, title, keepAfterRouteChange);
    }

    error(title: string, message: string, keepAfterRouteChange = false) {
        this.notification(NotificationType.Error, message, title, keepAfterRouteChange);
    }

    info(title: string, message: string, keepAfterRouteChange = false) {
        this.notification(NotificationType.Info, message, title, keepAfterRouteChange);
    }

    warn(title: string, message: string, keepAfterRouteChange = false) {
        this.notification(NotificationType.Warning, message, title, keepAfterRouteChange);
    }

    cookies(title: string, message: string, keepAfterRouteChange = false) {
        this.notification(NotificationType.Cookies, message, title, keepAfterRouteChange);
    }

    notification(type: NotificationType, message: string, title: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        let now = new Date();
        let finalExpiration = type === NotificationType.Cookies ? 60000 : this.expiration;
        this.subject.next(<Notification>{ type: type, title: title, message: message, expiration: now.getTime() + finalExpiration });
    }
    clear() {
        this.subject.next();
    }

    getMessageFromCode(code){
      let ret_val = code;

      switch (code){
        case 'MISSING_INPUT_PARAMETERS':
          ret_val = 'Не правильно введенные данные';
          break;
        case 'EMAIL_OR_PASSWORD_INCORRECT':
          ret_val = 'Не правильный емейл или пароль';
          break;
      }

      return ret_val;
    }

}
