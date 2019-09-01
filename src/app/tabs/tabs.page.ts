import { User, Role } from './../models/user';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  user: User;

  constructor(
    private authService: AuthService
  ) {
    this.user = this.authService.user;
  }
}
