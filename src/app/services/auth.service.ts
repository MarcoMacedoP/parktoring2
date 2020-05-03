import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from "@angular/fire/firestore";
type userParams = {
  email: string;
  password: string;
};
@Injectable({
  providedIn: "root",
})
export class AuthService {
  static user: firebase.User;
  especialistCollection: AngularFirestoreCollection<{}>;
  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.especialistCollection = firestore.collection("Doctores");
  }

  async login({ email, password }: userParams) {
    const result = await this.auth.signInWithEmailAndPassword(email, password);
    AuthService.user = result.user;
  }

  async signUp({ email, password, name }: userParams & { name: string }) {
    const result = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    const user = await this.especialistCollection.add({
      uid: result.user.uid,
      name,
      email,
    });
    return user;
  }
  hasUser() {
    return this.auth.authState;
  }
  logout() {
    return this.auth.signOut();
  }
}
