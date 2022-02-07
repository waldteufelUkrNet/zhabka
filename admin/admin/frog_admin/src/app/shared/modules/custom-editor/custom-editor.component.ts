import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ValidationService} from '../../services';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-custom-editor',
  templateUrl: './custom-editor.component.html',
  styleUrls: ['./custom-editor.component.scss']
})
export class CustomEditorComponent implements OnInit {
  @Input() value;
  @Input() label;
  @Input() placeholder;
  @Input() required = true;
  @Input() showError = false;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() invalidMessage = '';
  @Output() change = new EventEmitter();

  currentValue;
  valid = {
    status: true,
    message: ''
  };
  public Editor = ClassicEditor;

  constructor(
    private validator: ValidationService
  ) {
  }

  ngOnInit() {
    this.currentValue = this.value ? this.value : '';

    if(this.invalid){
      this.valid = {
        status: false,
        message: this.invalidMessage
      };
    } else {
      this.valid = this.validator.text(this.currentValue, this.required);
    }

    setTimeout(() => {
      this.changed();
    });

  }

  changed(){
    this.valid = this.validator.text(this.currentValue, this.required);

    this.change.emit(
      {
        setval: true,
        value: this.currentValue,
        valid: this.valid && this.valid.status
      })
  }



}
