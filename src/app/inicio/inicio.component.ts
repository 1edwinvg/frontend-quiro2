import { Component, OnInit, Input } from '@angular/core';
import { ProtractorExpectedConditions } from 'protractor';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  private tabsNombres:string;
  panelOpenState = false;
  constructor() { }

  ngOnInit() {

    this.tabsNombres = 'Generar Factura';
    
  }

  public executeSelectedChange = (event) => {
    console.log(event);
    this.tabsNombres= event.tab.textLabel;
  }

}
