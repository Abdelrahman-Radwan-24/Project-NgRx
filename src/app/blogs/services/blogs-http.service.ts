import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Blog } from "../model/blog";
import { map } from "rxjs/operators";
import { Lesson } from "../model/lesson";
import { environment } from "../../../environments/environment";

@Injectable()
export class BlogsHttpService {
  constructor(private http: HttpClient) {}

  findAllBlogs(): Observable<Blog[]> {
    return this.http.get(`${environment.baseUrl}/api/test/blogs`).pipe(map((res) => res["payload"]));
  }

  findBlogByUrl(blogUrl: string): Observable<Blog> {
    return this.http.get<Blog>(`${environment.baseUrl}/api/test/blogs/${blogUrl}`);
  }

  findLessons(
    blogId: number,
    pageNumber = 0,
    pageSize = 3
  ): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${environment.baseUrl}/api/test/lessons/blog/${blogId}`)
    }

  saveBlog(blogId: string | number, changes: Partial<Blog>) {
    return this.http.put(`${environment.baseUrl}/api/test/blogs/${blogId}`, changes);
  }
}
