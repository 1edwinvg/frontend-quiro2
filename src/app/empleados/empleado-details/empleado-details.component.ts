import { Component, OnInit } from '@angular/core';
import { Empleado } from '../../_interface/Empleado.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../shared/repository.service';
import { ErrorHandlerService } from '../../shared/error-handler.service';

@Component({
  selector: 'app-empleado-details',
  templateUrl: './empleado-details.component.html',
  styleUrls: ['./empleado-details.component.css']
})
export class EmpleadoDetailsComponent implements OnInit {
  public owner: Empleado;
 

  constructor(private repository: RepositoryService, private router: Router, 
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getOwnerDetails();
    console.log("ESTAMOS EN EL COMPONENTE EmpleadoDetailsComponent");
  }

  private getOwnerDetails = () =>{
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/empleados/${id}`;
    console.log(`el id del empleado es ${id} y la apiUrl es ${apiUrl}`);
 
    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.owner = res as Empleado;
    },
    (error) =>{
      this.errorHandler.handleError(error);
    })
  }
}
