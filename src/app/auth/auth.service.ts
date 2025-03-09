import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "./model/user.model";
import { environment } from "../../environments/environment";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(name: string, password: string): Observable<User> {
    return this.http.post<User>(`${environment.baseUrl}/api/test/users`, { name, password });
  }
}
