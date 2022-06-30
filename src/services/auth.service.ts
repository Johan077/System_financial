import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Firestore , collectionData} from '@angular/fire/firestore';
import { credit } from '../interfaces/credit';
import { collection , addDoc , doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public email:string ='';
  public userData: Observable<firebase.User | null | undefined>;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: Firestore,
    ) { 
      this.userData = afAuth.authState ;
    }

  //servicio para registrar usuarios
  async register(email: string, password: string) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log('el error es', err);
      return null;
    }
  }

  //seervicio para realizar login
  async login(email: string, password: string) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.log('el error es', err);
      return null;
    }
  }

  //servicio para para autenticacion de google
  async google(email: string, password: string) {
    try {
      return await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (err) {
      console.log('el error con google es', err);
      return null;
    }
  }

  //Servicio para crear Creditos
  addCredit(credit: credit){
    const creditos = collection(this.firestore,'creditos');
    return addDoc(creditos, credit);
  }

  //Servicio para traer Creditos
  getCredit():Observable<credit[]>{
    const creditos = collection(this.firestore,'creditos');
    return collectionData(creditos, {idField: 'id'}) as Observable<credit[]>;
  }

  //Servicio valida si se encuentra logueado
  getLogged() {
    return this.afAuth.authState;
  }

  //Servicio para cerrar sesion
  logout() {
    this.afAuth.signOut();
  }
}
