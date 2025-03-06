import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { concatMap, filter, map, withLatestFrom } from "rxjs/operators";
import { AppState } from "../reducers";
import { blogsActions } from "./blogs-actions-types";
import { selectHasDataLoaded } from "./blogs.selector";
import { BlogsHttpService } from "./services/blogs-http.service";

@Injectable({
  providedIn: "root",
})
export class blogsEffects {
  constructor(
    private BlogsHttpService: BlogsHttpService,
    private Actions$: Actions,
    private Store: Store<AppState>
  ) {}

  loadBlogs$ = createEffect(
    () =>
      this.Actions$.pipe(
        ofType(blogsActions.loadAllBlogs),
        withLatestFrom(this.Store.pipe(select(selectHasDataLoaded))),
        filter(([_, hasDataLoaded]) => !hasDataLoaded),
        concatMap(() => this.BlogsHttpService.findAllBlogs()),
        map((blogs) => blogsActions.loadAllBlogsActions({ blogs }))
      ),
    {
      dispatch: true,
    }
  );

  saveBlog$ = createEffect(
    () =>
      this.Actions$.pipe(
        ofType(blogsActions.blogsUpdate),
        concatMap((action) =>
          this.BlogsHttpService.saveBlog(
            action.updated.id,
            action.updated.changes
          )
        )
      ),
    {
      dispatch: false,
    }
  );
}
