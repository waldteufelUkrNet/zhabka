import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../shared';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  settings;
  message;

  constructor(
    private settingsService: SettingsService
  ) {
  }

  ngOnInit() {
    this.settingsService.getSettings()
      .then(_set => {
        this.settings = _set;
      })
  }

  setFieldValue(event, name){
    if(event.setval){
      this.settings[name] = event.value;
    }
  }

  saveSettings(){
    this.settingsService.saveSettings(this.settings)
      .then(setData => {
        this.message = 'Изменения сохранены!';
        setTimeout(() => {
          this.message = '';
        }, 5000);
      })
  }

}
