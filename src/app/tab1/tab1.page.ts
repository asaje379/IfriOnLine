import { AuthService } from './../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Information, Info } from './../models/info';
import { DefaultService } from './../services/default.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

  selectedFile = 'Aucun ...';
  fileSelected: File;
  informations: Information[] = [];
  sub: Subscription;
  periode: Date = null;
  destinataire: number = -1;
  specialites: string[] = [];
  niveauEtudes: number[] = [];
  activeForm: false;

  constructor(
    private service: DefaultService,
    public toastController: ToastController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.sub = this.service.subject.subscribe((data) => {
      this.informations = this.service.filterByType(data, Info.emp);
      console.log(this.informations);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  pickFile() {
    let pf = document.getElementById('empInput');
    pf.click();
  }

  onFileSelected(e) {
    this.selectedFile = e.name;
    this.fileSelected = e;
  }

  initForm() {
    this.periode = null;
    this.destinataire = -1;
    this.fileSelected = null;
    this.niveauEtudes = [];
    this.specialites = [];
    this.selectedFile = 'Aucun ...';
  }

  onSubmit() {
    if (
      this.periode === null ||
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
        description: null,
        file: this.fileSelected,
        id: this.genId(),
        destinataire: this.destinataire,
        specialites: this.specialites,
        niveauEtudes: this.niveauEtudes,
        periode: new Date(this.periode),
        title: null,
        object: null,
        ref: null,
        typeInfo: Info.emp,
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

  async presentClickToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  getDate(date: Date) {
    const mth = (date.getMonth() > 8) ? (date.getMonth()+1) : ('0'+(date.getMonth()+1));
    return date.getDate() + '-' + mth + '-' + date.getFullYear();
  }

  openInfo(info: Information) {
    this.presentClickToast('Téléchargement du fichier '+info.file.name+' en cours ...');
    setTimeout(() => {
      this.presentClickToast('Téléchargement terminé ...');
    }, 1000);
  }

  logout() {
    this.authService.logout();
  }
}
