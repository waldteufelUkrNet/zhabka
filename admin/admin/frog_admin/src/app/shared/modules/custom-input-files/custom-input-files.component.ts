import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import * as moment from 'moment';
import {environment} from '../../../../environments/environment'
import {FileService, ValidationService} from '../../index'

@Component({
  selector: 'app-custom-input-files',
  templateUrl: './custom-input-files.component.html',
  styleUrls: ['./custom-input-files.component.scss']
})
export class CustomInputFilesComponent implements OnInit {
  @Input() count = 1;
  @Input() value;
  @Input() label;
  @Input() private = true;
  @Input() required = true;
  @Input() disabled = false;
  @Input() showError = false;
  @Output() change = new EventEmitter();
  @Output() deleted = new EventEmitter();

  currentValue;

  rand;
  timestamp;
  valid = {
    status: true,
    message: ''
  };

  constructor(
    private fileService: FileService,
    private validator: ValidationService
  ) {
  }

  ngOnInit() {
    this.currentValue = this.value ? this.value : this.count === 1 ? null : [];

    if(this.count === 1){
      this.valid = this.validator.photo(this.currentValue, this.required);
    } else {
      this.valid = this.validator.photo(this.currentValue[0], this.required);
    }

    this.rand = this.randomKey();
    this.timestamp = moment().unix();
  }

  randomKey(len = 7, charSet = null) {
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < len; i++) {
      let randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
  }

  uploadImage(event){
    let files = event.srcElement.files;
    let fileCount = files.length;
    if (fileCount > 0) {
      let _delete = null;
      if(this.count === 1)
        _delete = this.currentValue;

      this.fileService.uploadFile(files[0])
        .then((uploadData: any) => {
          if(this.count === 1){
            this.currentValue = uploadData;
          } else {
            this.currentValue.push(uploadData);
          }
          this.timestamp = moment().unix();

          /*if(_delete)
            this.fileService.deleteFile(_delete)
              .then(delData => {});*/

          if(this.count === 1){
            this.valid = this.validator.photo(this.currentValue, this.required);
          } else {
            this.valid = this.validator.photo(this.currentValue[0], this.required);
          }

          this.change.emit(
            {
              setval: true,
              value: this.currentValue,
              uploaded: uploadData,
              valid: this.valid && this.valid.status
            })
        })
    }
  }

  deleteImage(item){
    this.fileService.deleteFile(item)
      .then(delData => {
        if(this.count === 1){
          this.currentValue = null;

          if(this.count === 1){
            this.valid = this.validator.photo(this.currentValue, this.required);
          } else {
            this.valid = this.validator.photo(this.currentValue[0], this.required);
          }

          this.deleted.emit({
            setval: true,
            value: this.currentValue,
            deleted: item,
            valid: this.valid && this.valid.status
          })
        } else {
          this.currentValue = this.currentValue.filter(_item => _item !== item);

          if(this.count === 1){
            this.valid = this.validator.photo(this.currentValue, this.required);
          } else {
            this.valid = this.validator.photo(this.currentValue[0], this.required);
          }

          this.deleted.emit({
            setval: true,
            value: this.currentValue,
            deleted: item,
            valid: this.valid && this.valid.status
          })
        }
      })
  }

}
