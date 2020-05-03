import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
})
export class SignupComponent implements OnInit {
  signUpForm;
  constructor(
    private router: Router,
    private auth: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.signUpForm = this.formBuilder.group({
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    });
  }

  ngOnInit(): void {}
  async goLogin() {
    await this.router.navigateByUrl("/auth/login");
  }
  async onSubmit() {
    console.log(this.signUpForm);
    const { email, password, name } = this.signUpForm.value;
    const result = await this.auth.signUp({ email, password, name });
    this.router.navigate(["/especialista/"]);
    console.log(result);
  }
}
