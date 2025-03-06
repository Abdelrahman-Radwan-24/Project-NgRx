import { createAction, props } from "@ngrx/store";
import { Blog } from "./model/blog";
import { Update } from "@ngrx/entity";


export const loadAllBlogs = createAction(
  "[Blogs Resolver] Load All Blogs"
)

export const loadAllBlogsActions = createAction(
  "[Blogs Loaded Effect] All Blogs Loaded",
  props<{blogs:Blog[]}>()
)


export const blogsUpdate = createAction(
  "[Edit Blogs Dialog] Blogs Update",
  props<{updated:Update<Blog>}>()
)


export const blogDelete = createAction(
  "[Delete Blogs] Blogs Delete",
  props<{deleted:Blog}>()
)
