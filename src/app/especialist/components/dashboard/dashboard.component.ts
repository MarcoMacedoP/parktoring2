import { Component, OnInit } from "@angular/core";
import { faCalendarPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { EspecialistService } from '../../services/especialist/especialist.service';
import { map, mergeMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
type date = {
  id: number | string;
  pacient: string;
  date: string;
  pacientId: number;
};


@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  faCalendarPlus = faCalendarPlus;
  faSearch = faSearch;
  pacients: Pacient[];
  consultas: Consulta[];
  consultsWithPacient: (Pacient & Consulta)[];
  hasLoaded = false;
  isAddDateModalOpen = false;
  constructor(private especialistService: EspecialistService) {
    this.getPacients();
  }

  ngOnInit(): void {

  }
  openAddDateModal() {
    this.isAddDateModalOpen = true;
  }
  closeOpenDateModal() {
    this.isAddDateModalOpen = false;
  }

  getConsults() {
    this.especialistService.getIncomingConsults().subscribe(
      (consults) => {
        this.consultas = consults;
        this.mergePacientsAndConsults();
      }
    )
  }

  getPacients() {
    this.especialistService.getAllPacients().subscribe(
      pacients => {
        this.pacients = pacients;
        this.getConsults();
      }
    )
  }

  mergePacientsAndConsults() {
    const mergedData = this.consultas.map(
      consult => {
        const pacient = this.pacients.find(pacient => pacient.id === consult.pacient_id)
        return { ...pacient, ...consult };
      }
    )
    this.hasLoaded = true;
    this.consultsWithPacient = mergedData;

  }



}
