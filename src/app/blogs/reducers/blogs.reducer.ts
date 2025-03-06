import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Blog, compareBlogs } from "../model/blog";
import { createReducer, on } from "@ngrx/store";
import { blogsActions } from "../blogs-actions-types";

export interface blogsState extends EntityState<Blog> {
  hasDataLoaded: boolean;
}

export const adapter = createEntityAdapter<Blog>({
  sortComparer: compareBlogs,
  selectId: (blogs) => blogs.id,
});

export const initilState: blogsState = adapter.getInitialState({
  hasDataLoaded: false,
});

export const blogsReducer = createReducer(
  initilState,
  on(blogsActions.loadAllBlogsActions, (state, action) =>
    adapter.addMany(action.blogs, { ...state, hasDataLoaded: true })
  ),
  on(blogsActions.blogsUpdate, (state, action) =>
    adapter.updateOne(action.updated, state)
  ),
  on(blogsActions.blogDelete ,
    (state , action) => adapter.removeOne(action.deleted.id , state)
  )
);

export const { selectAll } = adapter.getSelectors();
