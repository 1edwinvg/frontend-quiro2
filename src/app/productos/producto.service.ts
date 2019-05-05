import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

public id: any;

  constructor() { }

  public getId() {
    return this.id;
  }
  public setId(id: string) {
    this.id = id;
  }
}
