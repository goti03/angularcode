import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { rejects } from "assert";
import { resolve } from "dns";
import { promise } from "protractor";
import { Observable } from "rxjs";

@Injectable({
providedIn:'root'
})
export class authGarud implements CanActivate{
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
        var token=window.localStorage.getItem('token');
        return (token)?true:false;
    }
}