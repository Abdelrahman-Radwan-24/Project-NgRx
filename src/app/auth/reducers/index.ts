import { createReducer, on } from "@ngrx/store";
import { AuthAction } from "../auth-types";
import { User } from "../model/user.model";

export const authFeatureKey = "auth";

export interface AuthState {
  user: User;
}

export const initilAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initilAuthState,
  on(AuthAction.login, (state, action) => {
    // console.log(action)
    // debugger;
    // state.user = action.user
    // return state
    return {
      user: action.user
    };
  }),
  on(AuthAction.logout, () => {
    return {
      user : undefined
    }
  } )
);
