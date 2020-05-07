import { Component, OnInit } from "@angular/core";
import { EspecialistService } from '../../services/especialist/especialist.service';


@Component({
  selector: "app-pacients",
  templateUrl: "./pacients.component.html",
})
export class PacientsComponent implements OnInit {
  pacients: (Pacient & { lastConsult: string, hasPassed: boolean })[];
  hasLoaded = false;
  constructor(private especialistService: EspecialistService) {
    this.getPacients();
  }

  ngOnInit(): void {
  }
  getPacients() {
    this.especialistService.getAllPacients().subscribe((pacients) => this.getConsultas(pacients));
  }
  getConsultas(pacients: Pacient[]) {
    this.especialistService.getConsultasOfEspecialist()
      .subscribe((consults) => this.mergePacientsWithConsults(consults, pacients))
  }
  mergePacientsWithConsults(consults: Consulta[], pacients: Pacient[]) {
    const today = new Date();
    const mergedPacients = pacients.map(pacient => {
      let lastConsult: null | Date = null;
      consults.forEach(consult => {
        const isPacientConsult = consult.pacient_id === pacient.id;
        if (isPacientConsult) {
          const actualConsult = new Date(consult.fecha.seconds * 1000);
          lastConsult = lastConsult
            ? lastConsult > actualConsult ? lastConsult : actualConsult
            : actualConsult;
        }
      })
      return {
        ...pacient,
        lastConsult: lastConsult.toDateString(),
        hasPassed: lastConsult < today
      }
    }
    )
    this.pacients = mergedPacients;
  }
}
