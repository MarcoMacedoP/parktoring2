import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
import { AuthService } from "src/app/services/auth.service";
import { Observable, merge } from "rxjs";
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
  especialistas;

  constructor(private auth: AuthService, private firestore: AngularFirestore) {
    this.auth.hasUser().subscribe((user) => (this.authUser = user));
  }

  private _getEspecialist() {
    return this.auth
      .hasUser()
      .pipe(
        map(({ uid }) =>
          this.firestore.collection("Doctores", (ref) =>
            ref.where("uid", "==", uid)
          )
        )
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
      })
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

  getAllPacients() {
    return this._getEspecialist().pipe(
      mergeMap(
        queryResult => queryResult.get()
      ),
      mergeMap(
        result => result.docs[0].id
      ),
      mergeMap(
        id => this.firestore.collection('Doctores').doc(id).collection('Pacientes').get()
      ),
      map(
        queryResult => queryResult.docs.map(doc => doc.data())
      ),

    )



  }
}
