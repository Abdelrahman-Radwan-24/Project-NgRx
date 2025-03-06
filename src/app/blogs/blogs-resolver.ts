import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { first, tap } from "rxjs/operators";
import { AppState } from "../reducers";
import { blogsActions } from "./blogs-actions-types";
import { selectHasDataLoaded } from "./blogs.selector";

@Injectable({
  providedIn: "root",
})
export class BlogsResolver implements Resolve<any> {
  constructor(private Store: Store<AppState>) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.Store.pipe(
      select(selectHasDataLoaded),
      first(),
      tap((hasDataLoaded) => {
        if (!hasDataLoaded) {
          this.Store.dispatch(blogsActions.loadAllBlogs());
        }
      })
    );
  }
}
