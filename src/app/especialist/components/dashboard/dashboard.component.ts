import { Component, OnInit } from "@angular/core";
import { faCalendarPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { EspecialistService } from '../../services/especialist/especialist.service';
import { map, mergeMap } from 'rxjs/operators';
type date = {
  id: number | string;
  pacient: string;
  date: string;
  pacientId: number;
};

const DATES: Array<date> = [
  {
    id: 1,
    pacient: "Alejandro Fernandez",
    date: "11/08/2020",
    pacientId: 1,
  },
  {
    id: 2,
    pacient: "Fernando Martinez",
    date: "11/08/2020",
    pacientId: 2,
  },
  {
    id: 3,
    pacient: "Marco Casas",
    date: "11/08/2020",
    pacientId: 3,
  },
  {
    id: 4,
    pacient: "Martin acosta",
    date: "11/08/2020",
    pacientId: 4,
  },
];
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  faCalendarPlus = faCalendarPlus;
  faSearch = faSearch;
  dates = DATES;
  pacients: Pacient[];
  consultas: Consulta[];
  hasLoaded = false;
  isAddDateModalOpen = false;
  constructor(private especialistService: EspecialistService) {
    this.getInitials()
  }

  ngOnInit(): void {

  }
  openAddDateModal() {
    this.isAddDateModalOpen = true;
  }
  closeOpenDateModal() {
    this.isAddDateModalOpen = false;
  }
  getInitials() {
    this.especialistService.getAllPacients().subscribe(this.setInitials);
  }
  setInitials = (pacients: Pacient[]) => {
    this.pacients = pacients;
    const pacientsIds = pacients.map(p => p.id)
    this.especialistService.getConsultasByIds(pacientsIds).subscribe(
      consultas => {
        this.consultas = consultas;
        this.hasLoaded = true;
        console.log(consultas)
      }
    );


  }

}
