import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class facturaClienteService {


public id: any;

  constructor() { }

  public getId() {
   
    return this.id;
  }
  public setId(id) {
    this.id = id;
  }
}