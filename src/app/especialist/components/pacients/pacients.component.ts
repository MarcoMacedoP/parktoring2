import { Component, OnInit } from "@angular/core";
import {
  PacientesInterface,
  PacienteService,
} from "../../services/paciente/paciente.service";

@Component({
  selector: "app-pacients",
  templateUrl: "./pacients.component.html",
})
export class PacientsComponent implements OnInit {
  pacientes: PacientesInterface;
  constructor(private pacientesService: PacienteService) {}

  ngOnInit(): void {
    this.pacientes = this.pacientesService.getAll();
    console.log(this.pacientes);
  }
}
