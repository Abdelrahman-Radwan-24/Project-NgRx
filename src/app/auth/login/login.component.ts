import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from "@angular/forms";

import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { noop } from "rxjs";
import { tap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { login } from "../auth.action";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl("swe.abdelrahman.a.radwan@gmail.com", [Validators.required]),
    password: new FormControl("1234", [Validators.required]),
  });

  constructor(
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router,
    private Store:Store
  ) {}

  ngOnInit() {}

  login() {
    const {email , password} = this.form.value

    this.auth.login(email , password)
    .pipe(tap(user => {
      console.log(user)
      const newUser = login({user})
      // console.log(newUser)
      // debugger;
      this.Store.dispatch( newUser )
      this.router.navigateByUrl('/blogs')
    }))
    .subscribe(
      noop,
      (err) => console.log(err)
    )

    // const logging = this.form.value
    // this.auth.login(email , password).subscribe({
    //   next : (res) => {
    //     console.log(res)
    //   },
    //   error : (err) => {
    //     console.log(err)
    //   }
    // })
  }
}
