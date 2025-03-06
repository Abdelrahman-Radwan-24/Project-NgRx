import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Blog } from "../model/blog";
import { BlogsHttpService } from "../services/blogs-http.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../reducers";
import { blogsUpdate } from "../blogs.actions";
import { Update } from "@ngrx/entity";

@Component({
  selector: "[blog-dialog]",
  templateUrl: "./edit-blog-dialog.component.html",
  styleUrls: ["./edit-blog-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditBlogDialogComponent implements OnChanges {
  @Input() state: any;
  @Input() blog: Blog;

  form = new FormGroup({
    description: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    longDescription: new FormControl("", [Validators.required]),
    promo: new FormControl<boolean>(false),
    url: new FormControl("", [Validators.required]),
    iconUrl: new FormControl("", [Validators.required]),
  });

  dialogTitle: string;

  @Input() mode: "create" | "update";

  loading$: Observable<boolean>;
  visible: boolean = false;

  @Output() closeModel: EventEmitter<any> = new EventEmitter<any>(null);

  stateOptions: any[] = [
    { label: "BEGINNER", value: "BEGINNER" },
    { label: "INTERMEDIATE", value: "INTERMEDIATE" },
    { label: "ADVANCED", value: "ADVANCED" },
  ];

  constructor(
    private blogsService: BlogsHttpService,
    private Store: Store<AppState>
  ) {}

  ngOnChanges(): void {
    if (this.blog && this.mode == "update") {
      this.form.patchValue({
        category: this.blog.category,
        description: this.blog.description,
        longDescription: this.blog.longDescription,
        url: this.blog.url,
        iconUrl: this.blog.iconUrl,
        promo: this.blog.promo,
      });
    }
  }

  onSave() {
    const blog: Blog = {
      ...this.blog,
      ...this.form.value,
    };

    const update: Update<Blog> = {
      id: blog.id,
      changes: blog,
    };

    this.Store.dispatch(blogsUpdate({ updated: update }));
    this.close("called");
  }

  close(state?) {
    this.closeModel.emit(state);
  }
}
