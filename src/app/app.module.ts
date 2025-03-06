import { BrowserModule } from "@angular/platform-browser";
import { NgModule, isDevMode } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule } from "@angular/common/http";

import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { SidebarModule } from "primeng/sidebar";
import { ButtonModule } from "primeng/button";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./reducers";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AuthGuard } from "./auth/auth.guard";
import { EffectsModule } from "@ngrx/effects";
import { RouterState, StoreRouterConnectingModule } from "@ngrx/router-store";

const routes: Routes = [
  {
    path: "blogs",
    loadChildren: () =>
      import("./blogs/blogs.module").then((m) => m.BlogModule),
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, {}),
    HttpClientModule,
    SidebarModule,
    ButtonModule,
    AuthModule.forRoot(),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateSerializability: true,
      },
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router",
      routerState: RouterState.Minimal,
    }),
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
