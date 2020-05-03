import { Component, OnInit } from "@angular/core";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { EspecialistService } from "../../services/especialist/especialist.service";
@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.css"],
})
export class LayoutComponent implements OnInit {
  faBars = faBars;
  menuIsShowed: boolean;
  profilePic =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
  constructor(
    private auth: AuthService,
    private router: Router,
    especialist: EspecialistService
  ) {
    especialist.getEspecialist().subscribe((data) => {
      this.profilePic = data.Foto;
    });
  }

  ngOnInit(): void {}
  toggleMenu() {
    this.menuIsShowed = !this.menuIsShowed;
  }
  async logout() {
    await this.auth.logout();
    this.router.navigate(["/"]);
  }
}
