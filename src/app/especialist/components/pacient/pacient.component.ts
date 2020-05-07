import { Component, OnInit } from "@angular/core";
import {
  faCalendarPlus,
  faSearch,
  faComment,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { Chart } from "chart.js";
import { ActivatedRoute } from '@angular/router';
import { EspecialistService } from '../../services/especialist/especialist.service';

@Component({
  selector: "app-pacient",
  templateUrl: "./pacient.component.html",
  styleUrls: ["./pacient.component.css"],
})
export class PacientComponent implements OnInit {
  faCalendarPlus = faCalendarPlus;
  faSearch = faSearch;
  faComment = faComment;
  faFilter = faFilter;

  pacient: Pacient;
  consults: Consulta[];

  oldestChart: any = null;
  latestChart: any = null;
  selectedChart: any = null;

  olderConsult: Consulta;
  latestConsult: Consulta;

  hasLoaded = false;

  constructor(private route: ActivatedRoute, private especialistService: EspecialistService) {

  }
  ngOnInit(): void {
    this.getPacient();
  }
  onSelection({ d1, d2, d3 }: Consulta) {
    this.selectedChart = this.makeChart({ d1, d3, d2, htmlId: 'selectedChart' })
  }

  private getPacient() {
    const pacientID = this.route.snapshot.paramMap.get('id');
    this.especialistService.getPacientByID(pacientID).subscribe(
      result => {
        this.pacient = result;

        this.getOlderConsult(pacientID);
      }
    )
  }

  private getOlderConsult(pacientID: string) {
    this.especialistService.getPacientOldestConsult(pacientID).subscribe(
      result => {
        this.olderConsult = result;
        this.getLatestConsult(pacientID);
      }
    )
  }

  private getLatestConsult(pacientID: string) {
    this.especialistService.getPacientLastestConsult(pacientID).subscribe(
      result => {
        this.latestConsult = result;

        this.getConsults(pacientID);
      }
    )
  }
  private getConsults(pacientID: string) {
    this.especialistService.getConsultasByPacientID(pacientID).subscribe(
      consults => {
        const olderConsult = this.olderConsult;
        const latestConsult = this.latestConsult;
        this.consults = consults.filter(c => c.id !== olderConsult.id && c.id !== latestConsult.id);

        this.getComments()
      }
    )
  }
  private getComments() {
    this.hasLoaded = true
    this.setCharts();
  }

  setCharts() {

    this.oldestChart = this.makeChart({
      d1: this.olderConsult.d1, d2: this.olderConsult.d2, d3: this.olderConsult.d3, htmlId: 'oldestChart'
    });
    this.latestChart = this.makeChart({
      d1: this.latestConsult.d1, d2: this.latestConsult.d2, d3: this.latestConsult.d3, htmlId: 'latestChart'
    })
  }


  private getLongerArrayInArray(array: Array<string[]>) {
    let olderArray: string[]
    array.forEach(innerArray => {
      if (!olderArray) {
        olderArray = innerArray;
        return;
      }
      olderArray = olderArray.length > innerArray.length ? olderArray : innerArray;
    });
    return olderArray;
  }

  private makeChart({ d1, d2, d3, htmlId }: { d1: string[], d2: string[], d3: string[], htmlId: string }) {
    const longerFingerData = this.getLongerArrayInArray([d1, d2, d3])
    return new Chart(htmlId, {
      type: "line",
      data: {
        labels: longerFingerData.map((value, index) => `Muestreo ${index + 1}`),
        datasets: [
          {
            label: "Dedo pulgar",
            data: d1,
            backgroundColor: ["transparent"],
            borderColor: ["#48bb78"],
            borderWidth: 1,
          },
          {
            label: "Dedo indice",
            data: d2,
            backgroundColor: ["transparent"],
            borderColor: ["#4299e1"],
            borderWidth: 1,
          },
          {
            label: "Dedo medio",
            data: d3,
            backgroundColor: ["transparent"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          }
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
}
