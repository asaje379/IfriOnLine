import { Subscription } from 'rxjs';
import { Information } from './../models/info';
import { ToastController } from '@ionic/angular';
import { DefaultService } from './../services/default.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {

  active_ni: boolean = false;
  active_cm: boolean = true;
  active_ev: boolean = false;
  selectedFile = 'Aucun ...';

  fileSelected: File = null;
  informations: Information[] = [];
  sub: Subscription;
  description: string = '';
  destinataire: number = -1;
  specialites: string[] = [];
  niveauEtudes: number[] = [];
  title: string = '';
  typeInfo: string = '';
  object: string = '';
  ref: string = '';
  dateEven: Date = null;

  constructor(
    private service: DefaultService,
    public toastController: ToastController
  ) {
    this.getNow();
  }

  ngOnInit() {
    this.sub = this.service.subject.subscribe((data) => {
      this.informations = this.service.filterByType(data);
      console.log(this.informations);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onChange(e) {
    this.typeInfo = e;
    switch (e) {
      case 'CM':
        this.active_cm = true;
        this.active_ev = false;
        this.active_ni = false;
        break;
      case 'NI':
        this.active_ni = true;
        this.active_cm = false;
        this.active_ev = false;
        break;
      case 'EVENT':
        this.active_ev = true;
        this.active_cm = false;
        this.active_ni = false;
        break;
    }
  }

  initForm() {
    this.title = '';
    this.object = '';
    this.ref = '';
    this.destinataire = -1;
    this.fileSelected = null;
    this.niveauEtudes = [];
    this.specialites = [];
    this.selectedFile = 'Aucun ...';
  }

  onSubmit() {
    if (
      this.niveauEtudes.length === 0 ||
      this.specialites.length === 0 ||
      this.destinataire === -1
    ) {
      alert('Veuillez remplir tous les champs');
    } else {
      const info: Information = {
        admin_id: null,
        datEven: this.dateEven,
        datPost: new Date(Date.now()),
        periode: null,
        file: this.fileSelected,
        id: this.genId(),
        destinataire: this.destinataire,
        specialites: this.specialites,
        niveauEtudes: this.niveauEtudes,
        description: this.description,
        title: this.title,
        object: this.object,
        ref: this.ref,
        typeInfo: this.typeInfo
      };
      this.service.save(info);
      this.presentToast();
      this.initForm();
    }
  }

  getNow() {
    let d = new Date(Date.now());
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  pickFile() {
    let pf = document.getElementById('fileInput');
    pf.click();
  }

  onFileSelected(e) {
    this.selectedFile = e.name;
    this.fileSelected = e;
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

  getTypeLabel(type) {
    let value;
    switch (type) {
      case 'CM':
        value = 'Communiqué';
        break;
      case 'NI':
        value = 'Note d\'information';
        break;
      case 'EVENT':
        value = 'Evénement'
        break;
    }
    return value;
  }

} 