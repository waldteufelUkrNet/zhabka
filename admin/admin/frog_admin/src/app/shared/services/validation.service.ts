import {Injectable} from '@angular/core';
import is from 'is_js';

var errors = {
  is_not_empty: 'Поле не должно быть пустым',
  select_from_list: 'Выберите значения из списка'
};

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() {
  }

  login(val, required = true) {
    let error = null;
    if(val){
      if(!val.match(/^[0-9a-zA-Zа-яёА-ЯЁ_]{1,100}$/)){
        error = 'Неправильный формат логина. Введите пожалуйста только буквы и цифры'
      }
    } else {
      if(required)
        error = errors.is_not_empty;
    }

    return {
      status: error === null,
      message: error
    };
  }

  password(val, required = true) {
    let error = null;
    if(val){
      if(!val.match(/^[0-9a-zA-Zа-яёА-ЯЁ_*]{1,100}$/)){
        error = 'Неправильный формат пароля. Введите пожалуйста только буквы и цифры'
      }
    } else {
      if(required)
        error = errors.is_not_empty;
    }

    return {
      status: error === null,
      message: error
    };
  }

  phone(val, required = true) {
    let error = null;
    if(val){
      if(!val.match(/\+7\d{10}/)){
        error = 'Неправильный формат телефона. Введите пожалуйста телефон в формате +7***********'
      }
    } else {
      if(required)
        error = errors.is_not_empty;
    }

    return {
      status: error === null,
      message: error
    };
  }

  checkDateTime(val, type, required = true){
    let error = null;

    if(val){
      if(!is.date(val)){
        error = 'Неправильный формат'
      }
    } else {
      if(required)
        error = errors.is_not_empty;
    }

    return {
      status: error === null,
      message: error
    };
  }

  number(val, required = true) {
    let error = null;
    if(val){
      val = '' + val;
      if(!val.match(/^[0-9]{1,50}$/)){
        error = 'Неправильный формат. Введите только цифры'
      }
    } else {
      if(required)
        error = errors.is_not_empty;
    }

    return {
      status: error === null,
      message: error
    };
  }

  email(val, required = true) {
    let error = null;
    if(val){
      if(!is.email(val)){
        error = 'Неправильный формат. Введите email'
      }
    } else {
      if(required)
        error = errors.is_not_empty;
    }

    return {
      status: error === null,
      message: error
    };
  }

  checkOption(val, array, field = 'id', required = true){
    if((!val || (this.array(val) && !val.length)) && required){
      return {
        status: false,
        message: errors.select_from_list
      };
    }


    let retval;

    if(this.array(val)){
      retval = false;
      if((!val || !val.length) && !required){
        retval = true;
      } else {
        for(let j=0;j<val.length;j++){
          let tmp = false;
          for(let i=0;i<array.length;i++){
            if(array[i][field] === val[j])
              tmp = true;
          }

          if(tmp){
            retval = true;
          }
        }
      }
    } else {
      retval = false;
      if(!val && !required){
        retval = true;
      } else {
        for(let i=0;i<array.length;i++){
          if(array[i][field] === val)
            retval = true;
        }
      }
    }

    return {
      status: retval,
      message: !retval ? errors.select_from_list : ''
    };
  }

  photo(val, required = true) {
    let error = null;
    if(val){
      if(!val.length){
        error = 'Неправильный формат'
      }
    } else {
      if(required)
        error = errors.is_not_empty;
    }

    return {
      status: error === null,
      message: error
    };
  }

  text(val, required = true) {
    let error = null;
    if(val){
      if(!val.length){
        error = 'Неправильный формат'
      }
    } else {
      if(required)
        error = errors.is_not_empty;
    }

    return {
      status: error === null,
      message: error
    };
  }


  array(val) {
    return val && is.array(val);
  }
}
