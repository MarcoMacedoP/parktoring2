declare interface Especialist {
  Consultorio: string;
  Correo: string;
  Domicilio: string;
  Edad: string;
  Especialidad: string;
  Foto: string;
  Nombre: string;
  Sexo: "Masculino" | "Femenino";
  uid: string;
  Celular: string;
}

declare interface Pacient {
  id: string;
  date: Date;
  name: string;
  Edad: string;
  Telefono: string;
}


declare interface Consulta {
  fecha: number | any;
  d1: string[];
  d2: string[];
  d3: string[];
  pacient_id: string;
  doctor_id: string;
}