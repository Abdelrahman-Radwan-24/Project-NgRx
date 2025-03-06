import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { isLoggedOut } from "./auth.selectors";
import { tap } from "rxjs/operators";


@Injectable({
  providedIn : 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(private Store:Store , private Router:Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.Store.pipe(
      select(isLoggedOut),
      tap(isLogout => {
        if(!isLogout){
          this.Router.navigate(['/blogs'])
        }
      })
    )
  }

}
