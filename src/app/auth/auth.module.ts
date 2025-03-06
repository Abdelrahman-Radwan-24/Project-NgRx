import { ModuleWithProviders, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./auth.service";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { StoreModule } from "@ngrx/store";
import * as fromAuth from "./reducers";
import { EffectsModule } from "@ngrx/effects";
import { Autheffects } from "./auth.effects";
import { LogoutGuard } from "./logout.guard";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    RouterModule.forChild([{ path: "", component: LoginComponent , canActivate : [LogoutGuard] }]),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    EffectsModule.forFeature([Autheffects]),
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [AuthService],
    };
  }
}
