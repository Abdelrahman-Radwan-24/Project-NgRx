import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Blog } from "../model/blog";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { blogDelete } from "../blogs.actions";

@Component({
  selector: "blogs-card-list",
  templateUrl: "./blogs-card-list.component.html",
  styleUrls: ["./blogs-card-list.component.scss"],
})
export class BlogsCardListComponent implements OnInit {
  @Input()
  blogs: Blog[];

  currentBlog: Blog;

  @Output()
  blogChanged = new EventEmitter();

  toggleAddBlog: boolean = false;
  constructor(private Store:Store<AppState>) {}

  ngOnInit() {}

  editblog(blog: Blog) {
    this.currentBlog = blog;
    this.toggleAddBlog = !this.toggleAddBlog;
  }

  onDeleteblog(blog: Blog) {
    this.Store.dispatch(blogDelete({deleted :blog }))
    this.close("called")
  }

  close(isCalled?) {
    if (isCalled) {
      this.blogChanged.emit();
    }
    this.toggleAddBlog = false;
  }
}
