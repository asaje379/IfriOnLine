import { User, Role } from './../models/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = null;
  users: User[] = [
    {
      matricule: "0000",
      password: "1234",
      role: Role.student
    },
    {
      matricule: "1234",
      password: "1234",
      role: Role.teacher
    },
    {
      matricule: "1111",
      password: "1234",
      role: Role.admin
    },
  ];

  constructor(
    private router: Router
  ) { }

  login(matricule, password) {
    for (let u of this.users) {
      if (u.matricule == matricule && u.password == password) {
        this.user = u;
        return true;
      }
    }
    return false;
  }

  logout() {
    if (confirm('Etes vous sûr de vouloir vous déconnecter ?')) {
      this.user = null;
      this.router.navigate(['']);
    }
  }

  userCanSeeRes() {
    if (this.user.role != Role.admin) {
      return true;
    } else {
      return false;
    }
  }
}
