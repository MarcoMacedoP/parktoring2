import { Component, OnInit } from "@angular/core";
import {
  faCalendarPlus,
  faSearch,
  faComment,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { Chart } from "chart.js";
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
  chart: any = null;

  constructor() {}

  ngOnInit(): void {
    this.chart = new Chart("realtime", {
      type: "line",
      data: {
        labels: ["Red", "Blue", "Green"],
        datasets: [
          {
            label: "Dedo Indice",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: ["transparent"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
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
