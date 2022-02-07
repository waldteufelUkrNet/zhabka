import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Router } from '@angular/router';
import {UserService} from "../services";
import {LinkPipe} from "../pipes";
import {of} from "rxjs/index";


@Injectable()
export class IsAuthentication implements CanActivate {

    constructor(
        private service: UserService,
        private router: Router,
        private linkPipe: LinkPipe
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        let user = this.service.checkLogin();
        if(user && user.token){
            return of(true);
        } else {
            this.router.navigate([this.linkPipe.transform('/login')]);
        }
    }
}

@Injectable()
export class NotAuthentication implements CanActivate {

    constructor(
        private service: UserService,
        private router: Router,
        private linkPipe: LinkPipe
    ){}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ){
        let user = this.service.checkLogin();
        if(!user || !user.token){
            return of(true);
        } else {
            this.router.navigate([this.linkPipe.transform('/')]);
        }
    }

}
