import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import {customHttpProvider} from './_helpers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NotAuthentication, IsAuthentication, UserService, ValidationService, NotificationService,  LinkPipe, FileService,SettingsService, OutletService } from './shared';
import { TinyEditorComponent } from './tiny-editor/tiny-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    TinyEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule
  ],
  providers: [customHttpProvider, NotAuthentication, IsAuthentication, UserService, ValidationService, NotificationService, LinkPipe, FileService, SettingsService, OutletService],
  bootstrap: [AppComponent]
})
export class AppModule { }
