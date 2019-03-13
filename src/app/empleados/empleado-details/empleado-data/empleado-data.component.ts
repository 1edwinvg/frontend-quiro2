import { Empleado } from '../../../_interface/Empleado.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-empleado-data',
  templateUrl: './empleado-data.component.html',
  styleUrls: ['./empleado-data.component.css']
})
export class EmpleadoDataComponent implements OnInit {
  @Input() public owner: Empleado;
  public selectOptions = [{name:'Show', value: 'show'}, {name: `Don't Show`, value: ''}];
  @Output() selectEmitt = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public onChange = (event) => {
    this.selectEmitt.emit(event.value);
  }

}
