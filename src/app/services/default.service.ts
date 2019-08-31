import { Information, Info } from './../models/info';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DefaultService {

  informations: Information[] = [];
  filteredInfos: Information[] = [];
  subject = new Subject<Information[]>();

  constructor() { }

  emit() {
    this.subject.next(this.informations);
  }

  getById(id) {
    return this.informations.find((info) => {
      return info.id === id;
    });
  }

  save(info) {
    this.informations.push(info);
    this.emit();
  }

  delete(id) {
    const index = this.informations.findIndex((info) => {
      return info.id === id;
    });
    this.informations.splice(index, 1);
  }

  filterByType(array: Information[], type?: string) {
    let selected = [];
    if (type) {
      for (let item of array) {
        if (item.typeInfo == type) {
          selected.push(item);
        }
      }
    } else {
      for (let item of array) {
        if (item.typeInfo != Info.emp && item.typeInfo != Info.re) {
          selected.push(item);
        }
      }
    }
    return selected;
  }
}
