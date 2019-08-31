import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  matricule: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.authService.login({
      matricule: this.matricule,
      password: this.password
    })) {
      this.router.navigate(['/home/tabs/tab1']);
    } else {
      this.matricule = '';
      this.password = '';
      this.presentToast();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Identifiant ou mot de passe incorrect.',
      duration: 3000
    });
    toast.present();
  }

}
