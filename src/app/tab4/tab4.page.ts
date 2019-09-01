import { ToastController } from '@ionic/angular';
import { DefaultService } from './../services/default.service';
import { Subscription } from 'rxjs';
import { Information, Info } from './../models/info';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  description: string = '';
  selectedFile: string = '';
  fileSelected: File = null;
  informations: Information[] = [];
  sub: Subscription;

  constructor(
    private authService: AuthService,
    private service: DefaultService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.sub = this.service.subject.subscribe((data) => {
      this.informations = this.service.filterByType(data, Info.res);
      console.log(this.informations);
    });
  }

  pickFile() {
    let pf = document.getElementById('fileInput');
    pf.click();
  }

  onFileSelected(e) {
    this.selectedFile = e.name;
    this.fileSelected = e;
  }

  logout() {
    this.authService.logout();
  }

  initForm() {
    this.fileSelected = null;
    this.selectedFile = 'Aucun ...';
    this.description = '';
  }

  onSubmit() {
    if (this.description.length === 0 || this.fileSelected == null) {
      alert('Veuillez remplir tous les champs');
    } else {
      const info: Information = {
        admin_id: null,
        datEven: null,
        datPost: new Date(Date.now()),
        periode: null,
        file: this.fileSelected,
        id: this.genId(),
        destinataire: null,
        specialites: null,
        niveauEtudes: null,
        description: this.description,
        title: null,
        object: null,
        ref: null,
        typeInfo: Info.res,
        image: null
      };
      this.service.save(info);
      this.presentToast();
      this.initForm();
    }
  }

  genId() {
    return this.informations[this.informations.length - 1] ?
      this.informations[this.informations.length - 1].id + 1 : 1;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Ajout effectué avec success.',
      duration: 2000
    });
    toast.present();
  }
}
