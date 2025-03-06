import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "../../reducers";
import {
  selectAdvancedBlogs,
  selectBrginnerBlogs,
  selectPromo,
} from "../blogs.selector";
import { Blog } from "../model/blog";
import { BlogsHttpService } from "../services/blogs-http.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  promoTotal$: Observable<number>;

  beginnerBlog$: Observable<Blog[]>;

  advancedBlog$: Observable<Blog[]>;

  toggleAddBlog: boolean = false;

  loading$: Observable<boolean>;

  constructor(
    private blogsService: BlogsHttpService,
    private Store: Store<AppState>
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.beginnerBlog$ = this.Store.pipe(select(selectBrginnerBlogs));
    this.advancedBlog$ = this.Store.pipe(select(selectAdvancedBlogs));
    this.promoTotal$ = this.Store.pipe(select(selectPromo));
  }

  onAddBlog() {
    this.toggleAddBlog = true;
  }
}
