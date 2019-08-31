import { User } from './../models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = null; 
  users: User[] = [
    {
      matricule: "0000",
      password: "1234"
    },
    {
      matricule: "1234",
      password: "1234"
    },
    {
      matricule: "1111",
      password: "1234"
    },
  ];

  constructor() { }

  login(user: User) {
    for (let u of this.users) {
      if (u.matricule == user.matricule && u.password == user.password) {
        this.user = user;
        return true;
      }
    }
    return false;
  }

  logout() {
    this.user = null;
  }
}
