import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { isLoggedIn } from "./auth.selectors";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private Router: Router, private Store: Store) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.Store.pipe(
      select(isLoggedIn),
      tap((islogin) => {
        if (!islogin) {
          this.Router.navigate(["/"]);
        }
      })
    );
  }
}
