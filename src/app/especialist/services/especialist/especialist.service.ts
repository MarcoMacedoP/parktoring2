import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { AuthService } from "src/app/services/auth.service";
import { Observable, forkJoin, zip } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { firestore } from "firebase";
export type User = {
  name: string;
  uui: string;
  profilePic: string;
};
@Injectable({
  providedIn: "root",
})
export class EspecialistService {
  userRef: AngularFirestoreCollection<User>;
  user: User;
  authUser: firebase.User;
  pacients: Pacient[];
  pacientsIds: string[];
  especialistID: string;

  constructor(private auth: AuthService, private firestore: AngularFirestore) { }

  private getEspecialistID() {
    return this.auth
      .hasUser()
      .pipe(
        mergeMap(({ uid }) => this.firestore.collection("Doctores", (ref) => ref.where("uid", "==", uid)).get()),
        map(e => {
          this.especialistID = e.docs[0].id;
          return this.especialistID;
        })
      );
  }

  /**
   * Retorna los datos de un doctor.
   */
  getEspecialist() {
    return this.auth.hasUser().pipe(
      mergeMap((u) =>
        this.firestore
          .collection<Especialist[]>("Doctores", (ref) =>
            ref.where("uid", "==", u.uid)
          )
          .get()
      ),
      map((e: any) => {
        const especialist: Especialist = e.docs[0].data();
        this.especialistID = e.docs[0].id;
        return especialist;
      }),
    );
  }
  updateEspecialist(userInfo?: Especialist) {
    return this.firestore
      .collection("Doctores", (ref) => ref.where("uid", "==", userInfo.uid))
      .get()
      .pipe(
        map((result) => result.docs[0].id),
        map((id) =>
          this.firestore.collection("Doctores").doc(id).update(userInfo)
        )
      );
  }
  // Retorna todas las consultas de un especialista.
  getConsultasOfEspecialist(): Observable<Consulta[]> {
    return this.getEspecialistID().pipe(
      mergeMap(id =>
        this.firestore.collection('Consultas',
          (ref) => ref.where('doctor_id', '==', this.especialistID))
          .get()
      ),
      map(queryResult =>
        queryResult.docs.map((doc: any) => doc.data())
      )
    )
  }

  /**
   * Dado un ID de paciente, retorna un arreglo de las citas del paciente.
   */
  getConsultasByPacientID(pacientID: string): Observable<Consulta[]> {
    return this.getEspecialistID().pipe(
      mergeMap(
        doctorID => this.firestore.collection('Consultas',
          (ref => ref.where('pacient_id', '==', pacientID).where('doctor_id', '==', doctorID))
        ).get()
      ),
      map(
        queryResult => queryResult.docs.map((doc: any) => doc.data())
      )
    )
  }
  /**
   * Retorna un arreglo de pacientes con un arreglo de consultas.
   */
  getPacientsWithConsults() {
    return forkJoin([this.getAllPacients(), this.getConsultasOfEspecialist()])
  }

  /**
   * Retorna un arreglo de las proximas consultas.
   */
  getIncomingConsults() {
    return this.getConsultasOfEspecialist().pipe(
      map(
        consultas => consultas.filter((c => {
          const today = new Date()
          const consultDate = new Date(c.fecha.seconds * 1000)
          const isComingDate = consultDate >= today;
          return isComingDate;
        }
        ))
      ),
      map(
        consultas => consultas.map((c) => ({ ...c, fecha: new Date(c.fecha.seconds * 1000).toDateString() }
        ))
      )
    )
  }

  getAllPacients(): Observable<Pacient[]> {
    return this.pacients
      ? new Observable(suscriber => suscriber.next(this.pacients))
      : this.getEspecialistID().pipe(
        mergeMap(
          id => this.firestore.collection('Doctores').doc(id).collection('Pacientes').get()
        ),
        map(
          queryResult => {
            this.pacients = queryResult.docs.map((doc: any) => {
              const pacient: Pacient = {
                ...doc.data(),
                id: doc.id,
              }
              return pacient;
            })
            this.pacientsIds = queryResult.docs.map(d => d.id);
            return this.pacients;
          }
        ),
      )
  }
}
