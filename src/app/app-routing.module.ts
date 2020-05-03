import { NgModule } from "@angular/core";
import {
  Routes,
  RouterModule,
  ExtraOptions,
  PreloadAllModules,
} from "@angular/router";
import { LandingComponent } from "./components/landing/landing.component";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { AuthGuard } from "./guards/auth.guard";
const router: ExtraOptions = {
  scrollPositionRestoration: "enabled",
  anchorScrolling: "enabled",
  useHash: false,
  preloadingStrategy: PreloadAllModules,
};

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: LandingComponent,
      },
      {
        path: "auth",
        children: [
          {
            path: "login",
            component: LoginComponent,
          },
          {
            path: "sign",
            component: SignupComponent,
          },
        ],
      },
    ],
  },
  {
    path: "especialista",
    canActivate: [AuthGuard],

    loadChildren: () =>
      import("./especialist/especialist.module").then(
        (m) => m.EspecialistModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, router)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
