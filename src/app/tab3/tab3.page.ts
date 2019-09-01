import { AuthService } from './../services/auth.service';
import { DefaultService } from './../services/default.service';
import { Subscription } from 'rxjs';
import { Information, Info } from './../models/info';
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  selectedFile = 'Aucun ...';
  fileSelected: File;
  informations: Information[] = [];
  sub: Subscription;
  description: string = '';
  destinataire: number = -1;
  specialites: string[] = [];
  niveauEtudes: number[] = [];
  activeForm: false;

  constructor(
    private service: DefaultService,
    public toastController: ToastController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.sub = this.service.subject.subscribe((data) => {
      this.informations = this.service.filterByType(data, Info.re);
      console.log(this.informations);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  pickFile() {
    let pf = document.getElementById('resInput');
    pf.click();
  }

  onFileSelected(e) {
    this.selectedFile = e.name;
    this.fileSelected = e;
  }

  initForm() {
    this.description = '';
    this.destinataire = -1;
    this.fileSelected = null;
    this.niveauEtudes = [];
    this.specialites = [];
    this.selectedFile = 'Aucun ...';
  }

  onSubmit() {
    if (
      this.description === '' ||
      this.niveauEtudes.length === 0 ||
      this.specialites.length === 0 ||
      this.destinataire === -1 ||
      this.fileSelected === null
    ) {
      alert('Veuillez remplir tous les champs');
    } else {
      const info: Information = {
        admin_id: null,
        datEven: null,
        datPost: new Date(Date.now()),
        periode: null,
        file: this.fileSelected,
        id: this.genId(),
        destinataire: this.destinataire,
        specialites: this.specialites,
        niveauEtudes: this.niveauEtudes,
        description: this.description,
        title: null,
        object: null,
        ref: null,
        typeInfo: Info.re,
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

  logout() {
    this.authService.logout();
  }
}
