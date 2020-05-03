import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EspecialistRoutingModule } from "./especialist.routing.module";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
//components
import { PacientsComponent } from "./components/pacients/pacients.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { PacientComponent } from "./components/pacient/pacient.component";
import { LayoutComponent } from "./components/layout/layout.component";
import { AddDateModalComponent } from "./components/add-date-modal/add-date-modal.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { EditProfileComponent } from "./components/edit-profile/edit-profile.component";

@NgModule({
  declarations: [
    PacientsComponent,
    DashboardComponent,
    PacientComponent,
    LayoutComponent,
    AddDateModalComponent,
    ProfileComponent,
    EditProfileComponent,
  ],
  imports: [
    CommonModule,
    EspecialistRoutingModule,
    FontAwesomeModule,
    RouterModule,
    ReactiveFormsModule,
  ],
})
export class EspecialistModule {}
