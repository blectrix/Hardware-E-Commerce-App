import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { setDoc } from '@firebase/firestore';
import { StorageService } from '../storage.service';
import * as firebase from 'firebase/app'
import 'firebase/auth'
import { Router } from '@angular/router';

export const user_key = 'siyeshe_holdings_user_id';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _fireAuth: Auth,
    private _firestore: Firestore,
    private storage: StorageService,
    private router: Router
  ) { }

  async register(formValue) {
    try {
      const registeredUser = await createUserWithEmailAndPassword(this._fireAuth, formValue.email, formValue.password);
      console.log('registered user: ', registeredUser);
      const uid = registeredUser.user.uid;
      const dataRef = doc(this._firestore, `users/${uid}`);
      const data ={
        name: formValue.name,
        surname: formValue.surname,
        username: formValue.username,
        email: formValue.email,
        contact: formValue.contact
      }
      
      
      setDoc(dataRef, data);
      await this.storage.setStorage(user_key, uid);
      
      
      this.router.navigate(['/auth-screen'])
      return uid;
    } catch(e) {
      throw(e);
    }
  }

  async login(formValue) {
    try {
      const response = await signInWithEmailAndPassword(this._fireAuth, formValue.email, formValue.password);
      console.log('login user: ', response);
      if(response?.user) {
        const uid = response.user.uid;
        await this.storage.setStorage(user_key, uid);
        if(response.user?.emailVerified == true) {
          this.router.navigate(['tabs']);
        } 
        // else 
        // {
        //   // this.router.navigate(['/verify-email']);
        // }
        return uid;
      } else {
        return false;
      }
    } catch(e) {
      throw(e);
    }
  }

  //email varification
  sendEmailForVarification(user : any) {
    user.sendEmailForVarification().then((res : any) => {
      this.router.navigate(['/varify-email']);
    }, (err : any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }

  // async resetPassword(formValue) {
  //   try {
  //     await sendPasswordResetEmail(this._fireAuth, formValue.email);
  //     console.log(formValue.email);
  //     if(formValue.email) {
  //       const uid = formValue.email.uid;
  //       await this.storage.setStorage(user_key, uid);
  //       return uid;
  //     } else {
  //       return false;
  //     }
  //   } catch(e) {
  //     throw(e);
  //   }
  // }

  // resetPassword(
  //   email:string
  // ):Promise<void>{
  //   return firebase.auth().sendPasswordResetEmail(email);
  // }

  // forgotPassword(email : string) {
  //   this.fireauth.sendPasswordResetEmail(email).then(() => {
  //     this.router.navigate(['/varify-email']);
  //   }, err => {
  //     alert('Something went wrong');
  //   })
  // }

  checkAuth() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this._fireAuth, user => {
        console.log(user);
        if(user) resolve(true);
        resolve(false);
      }); 
    });
  }

  async logout() {
    try {
      await signOut(this._fireAuth);
      await this.storage.removeStorage(user_key);
      return true;
    } catch(e) {
      throw(e);
    }
  }
}
