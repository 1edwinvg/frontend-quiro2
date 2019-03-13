import { Component } from '@angular/core';
import { Empleado } from './_interface/Empleado.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QuiroMasaje2';
  currentUser: Empleado;
  constructor() { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
}
