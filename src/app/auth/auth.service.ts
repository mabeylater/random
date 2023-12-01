import { Injectable } from '@angular/core';
import { UserCredential, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../api/api.service';
import { BehaviorSubject } from 'rxjs';

export const user$ = new BehaviorSubject<UserCredential | null>(null);

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$ = user$;
  auth = getAuth(app)

  constructor() { }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.user$.next(userCredential);
      return userCredential.user;
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
    return null;
  }
}
