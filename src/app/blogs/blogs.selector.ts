import { createFeatureSelector, createSelector } from "@ngrx/store";
import { blogsState } from "./reducers/blogs.reducer";
import * as fromBlogs from "./reducers/blogs.reducer";

export const blogsSelector = createFeatureSelector<blogsState>("blogs");

export const selectAllBlogs = createSelector(
  blogsSelector,
  fromBlogs.selectAll
);

export const selectAdvancedBlogs = createSelector(selectAllBlogs, (state) =>
  state.filter((blog) => blog.category === "ADVANCED")
);

export const selectBrginnerBlogs = createSelector(selectAllBlogs, (state) =>
  state.filter((blog) => blog.category === "BEGINNER")
);

export const selectPromo = createSelector(
  selectAllBlogs,
  (state) => state.filter((promos) => promos.promo).length
);

export const selectHasDataLoaded = createSelector(
  blogsSelector,
  state => state.hasDataLoaded
);
