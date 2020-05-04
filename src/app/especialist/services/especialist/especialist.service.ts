import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { AuthService } from "src/app/services/auth.service";
import { Observable, merge, forkJoin, zip } from "rxjs";
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

  getConsultasByIds(ids: string[]) {
    return forkJoin(ids.map(id => this.getConsultaByPacientId(id))).pipe(
      map(e => e.reduce((consultas, val) => consultas.concat(val)))
    )
  }

  getConsultaByPacientId(id: string): Observable<Consulta[]> {
    return this.firestore.collection('Doctores').doc(this.especialistID)
      .collection('Pacientes').doc(id).collection('Consultas', (ref) => ref.orderBy('date', 'asc'))
      .get().pipe(
        map(
          queryResult => queryResult.docs.map((doc: any) => {
            const consulta: Consulta = { ...doc.data(), id: doc.id }
            return consulta;
          })
        )
      )
  }
}
