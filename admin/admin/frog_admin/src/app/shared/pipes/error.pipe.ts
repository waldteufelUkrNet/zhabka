import {Pipe, PipeTransform} from '@angular/core';
import {conditionallyCreateMapObjectLiteral} from "@angular/compiler/src/render3/view/util";

@Pipe({
    name: 'error'
})
export class ErrorPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return this.getError(value);
    }

    getError(message){
      let retval;
      switch (message){
        case 'MISSING_INUT_PARAMETERS':
        case 'MISSING_INPUT_PARAMETERS':
          retval = 'Неправильно введены данные';
          break;
        case 'WRONG_LOGIN_OR_PASSWORD':
          retval = 'Не правильный логин или пароль';
          break;
        case 'USER_BY_LOGIN_ALREADY_EXISTS':
          retval = 'Юзер с таким логином уже существует';
          break;
        case 'USER_BY_PHONE_ALREADY_EXISTS':
          retval = 'Юзер с таким телефоном уже существует';
          break;
        case 'AUTH_ERROR':
        case 'PERMISSION_DENIED':
          retval = 'Нет доступа';
          break;
        case 'NO_SUCH_IMAGE':
          retval = 'Файл не найден';
          break;
        case 'SYSTEM_ERROR':
          retval = 'Системная ошибка';
          break;
        case 'OFFER_ALREADY_EXISTS':
          retval = 'Запрос отклонен! Вы уже отправили этому пользователю предложения';
          break;
        case 'NO_SUCH_OFFER':
          retval = 'Предложения не найдено! возможно вы уже подтвердили этого водителя';
          break;


          /*
            WRONG_USER
            NO_SUCH_INVITATION
            INVITATION_ERROR
            INVALID_ROLE
            USER_BY_LOGIN_ALREADY_EXISTS
            USER_BY_PHONE_ALREADY_EXISTS
            INVALID_ROLE
            WRONG_CODE
            AUTH_ERROR
            WRONG_LOGIN_OR_PASSWORD
            MISSING_INPUT_PARAMETERS
            SERVER_ERROR
            NO_SUCH_USER
            NO_SUCH_CHATROOM
            NO_SUCH_GOODS_ITEM
            WRONG_STATUS
            WRONG_PAYMENT_DELAY
            ADDRESS_FROM_ERROR
            ADDRESS_TO_ERROR
            NO_ACTIVE_CAR
            NO_SUCH_CAR
            WRONG_CAR_MODEL
            WRONG_FUEL_TYPE
            WRONG_CAR_TYPE
            WRONG_CAR
            CANT_REMOVE_ACTIVE_CAR
            NO_SUCH_FILTER
            CANT_REMOVE_SYSTEM_FILTER
            FLIGHT_EXISTS
            NO_FLIGHT
            OUT_OF_RADIUS
            WRONG_GOODS_ITEM_STATUS
            OFFER_ALREADY_EXISTS
            NO_SUCH_OFFER
            NO_SUCH_DISPATCHER
            NO_SUCH_CARRIER
          * */

        default:
          retval = message
      }
      return retval;
    }

}
