import { Injectable } from "@angular/core";

export interface PacienteInterface {
  id: string;
  name: string;
  lastTest: string;
}

export type PacientesInterface = Array<PacienteInterface>;

@Injectable({
  providedIn: "root",
})
export class PacienteService {
  constructor() {}
  getAll() {
    return [
      {
        id: "1",
        name: "Mustafar Hionojosa",
        lastTest: "11/04/2020",
      },
      {
        id: "1",
        name: "Mustafar Hionojosa",
        lastTest: "11/04/2020",
      },
      {
        id: "1",
        name: "Mustafar Hionojosa",
        lastTest: "11/04/2020",
      },
      {
        id: "1",
        name: "Mustafar Hionojosa",
        lastTest: "11/04/2020",
      },
      {
        id: "1",
        name: "Mustafar Hionojosa",
        lastTest: "11/04/2020",
      },
      {
        id: "1",
        name: "Mustafar Hionojosa",
        lastTest: "11/04/2020",
      },
      {
        id: "1",
        name: "Mustafar Hionojosa",
        lastTest: "11/04/2020",
      },
    ];
  }
}
