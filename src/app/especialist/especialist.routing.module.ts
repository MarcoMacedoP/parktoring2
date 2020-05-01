import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PacientsComponent } from "./components/pacients/pacients.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PacientComponent } from "./components/pacient/pacient.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { ProfileComponent } from './components/profile/profile.component';
const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: DashboardComponent,
      },
      {
        path: "perfil",
        component: ProfileComponent
      },
      {
        path: "pacientes",
        component: PacientsComponent,
      },
      {
        path: "pacientes/:id",
        component: PacientComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspecialistRoutingModule { }
