import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent implements OnInit {
  loginForm;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: "",
      password: "",
    });
  }

  ngOnInit(): void {}
  async goSignup() {
    await this.router.navigateByUrl("/auth/sign");
  }
  async onSubmit() {
    await this.auth.login(this.loginForm.value);
    this.router.navigate(["/especialista/"]);
  }
}
