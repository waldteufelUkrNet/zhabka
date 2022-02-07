import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IsAuthentication, NotAuthentication} from './shared';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: environment.adminUrl, children: [
      { path: '', loadChildren: () => import('./authorized/authorized.module').then(m => m.AuthorizedModule), canActivate: [IsAuthentication] },
      { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule), canActivate: [NotAuthentication] },
      { path: '**', redirectTo: 'not-found' }
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
