import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore'
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
export type User = {
  name: string;
  uui: string;
  profilePic: string;
}
@Injectable({
  providedIn: 'root'
})
export class EspecialistService {
  userRef: AngularFirestoreCollection<User>;
  user: User;
  authUser: firebase.User;
  especialistas;

  constructor(private auth: AuthService, private firestore: AngularFirestore) {
    this.auth.hasUser().subscribe(user => this.authUser = user);
  }
  getEspecialist() {
    return this.auth.hasUser().pipe(
      mergeMap(u =>
        this.firestore.collection<Especialist[]>('Doctores',
          (ref => ref.where('uid', '==', u.uid))
        ).get()
      ),
      map((e: any) => {
        const especialist: Especialist = e.docs[0].data();
        return especialist;

      })
    )


  }
  updateEspecialist(userInfo: User) {
  }
  deleteEspecialist() {
  }

}
