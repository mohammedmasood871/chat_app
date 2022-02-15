import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {
  Authorization: boolean = true
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const authToken = localStorage.getItem("authToken")
      const sessionToken = localStorage.getItem("sessionToken")
      const isAlreadyLoggedIn = !!authToken && !!sessionToken

    this.Authorization = false
    return  isAlreadyLoggedIn ;
  }
  
}
