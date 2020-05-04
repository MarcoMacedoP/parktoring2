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
  "Apellido Paterno": string;
  Edad: string;
  Telefono: string;
  consultas: Consulta[];
}


declare interface Consulta {
  id: string;
  Fecha: string;
  indice: number[];
  medio: number[];
  pulgar: number[];
}