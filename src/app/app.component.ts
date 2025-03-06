import { Component, OnInit } from "@angular/core";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AuthAction } from "./auth/auth-types";
import { isLoggedIn, isLoggedOut } from "./auth/auth.selectors";
import { AuthState } from "./auth/reducers";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  loading = true;

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  sidebarVisible: boolean = false;

  constructor(private router: Router, private Store: Store<AuthState>) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });

    // this.Store.subscribe(console.log)

    this.isLoggedIn$ = this.Store.select(isLoggedIn);

    this.isLoggedOut$ = this.Store.select(isLoggedOut);

    const userProfile = localStorage.getItem('user')
    if(userProfile){
      this.Store.dispatch(AuthAction.login({user : JSON.parse(userProfile)}))
    }
  }



  logout() {
    // logout()
    this.Store.dispatch(AuthAction.logout());
    this.router.navigateByUrl("/");
  }
  
}
