import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaServiceId {

public id: any;

  constructor() { }

  public getId() {
    return this.id;
  }
  public setId(id) {
    this.id = id;
  }
}