import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { BlogComponent } from "./blog/blog.component";
import { BlogsCardListComponent } from "./blogs-card-list/blogs-card-list.component";
import { EditBlogDialogComponent } from "./edit-blog-dialog/edit-blog-dialog.component";
import { BlogsHttpService } from "./services/blogs-http.service";
import { TabViewModule } from "primeng/tabview";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { SelectButtonModule } from "primeng/selectbutton";
import { InputTextareaModule } from "primeng/inputtextarea";

import { ToggleButtonModule } from "primeng/togglebutton";
import { TableModule } from "primeng/table";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { StoreModule } from "@ngrx/store";

import { BlogsResolver } from "./blogs-resolver";
import { EffectsModule } from "@ngrx/effects";
import { blogsEffects } from "./blogs.effects";
import { blogsReducer } from "./reducers/blogs.reducer";

export const blogsRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    resolve: {
      blogs: BlogsResolver,
    },
  },
  {
    path: ":blogUrl",
    component: BlogComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(blogsRoutes),
    TabViewModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    SelectButtonModule,
    ToggleButtonModule,
    InputTextareaModule,
    TableModule,
    ProgressSpinnerModule,
    StoreModule.forFeature("blogs", blogsReducer),
    EffectsModule.forFeature([blogsEffects]),
  ],
  declarations: [
    HomeComponent,
    BlogsCardListComponent,
    EditBlogDialogComponent,
    BlogComponent,
  ],
  exports: [
    HomeComponent,
    BlogsCardListComponent,
    EditBlogDialogComponent,
    BlogComponent,
  ],
  providers: [BlogsHttpService],
})
export class BlogModule {
  constructor() {}
}
