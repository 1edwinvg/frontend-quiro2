import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../_interface/cliente.model';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../shared/repository.service';
import { ErrorHandlerService } from '../../shared/error-handler.service';

@Component({
  selector: 'app-cliente-details',
  templateUrl: './cliente-details.component.html',
  styleUrls: ['./cliente-details.component.css']
})
export class ClienteDetailsComponent implements OnInit {

  public cliente: Cliente;
 

  constructor(private repository: RepositoryService, private router: Router, 
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getOwnerDetails();
    console.log("ESTAMOS EN EL COMPONENTE ClienteDetailsComponent");
  }

  // peticion al backend, se le envia el id para buscar al cliente
  private getOwnerDetails = () =>{
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/clientesdetalle/${id}`;
    console.log(`el id del cliente es ${id} y la apiUrl es ${apiUrl}`);
 
    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.cliente = res as Cliente;
    },
    (error) =>{
      this.errorHandler.handleError(error);
    })
  }


}
