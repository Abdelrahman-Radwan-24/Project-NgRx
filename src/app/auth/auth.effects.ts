import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthAction } from "./auth-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class Autheffects {
  constructor(private Actions$: Actions , private Router:Router ) {}

  login$ = createEffect(
    () =>
      this.Actions$.pipe(
        ofType(AuthAction.login),
        tap((action) => {
          localStorage.setItem("user", JSON.stringify(action.user));
        })
      ),
    { dispatch: false }
  );

  logOut$ = createEffect(() =>
    this.Actions$.pipe(
      ofType(AuthAction.logout),
      tap((action) => {
        localStorage.removeItem("user")
        this.Router.navigate(['/'])
      })
    ), {dispatch:false}
  );

}
