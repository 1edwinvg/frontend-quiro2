import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Cliente } from 'src/app/_interface/cliente.model';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FacturaServiceId } from '../buscar-facturas-id/FacturaServiceId';
import { facturaClienteService } from '../buscar-facturas-cliente/facturaClienteService';
import { DetalleComponent } from '../buscar-facturas-id/detalle/detalle.component';
import { DetallesComponent } from '../buscar-facturas-cliente/detalles/detalles.component';
import { Factura } from 'src/app/_interface/factura.model';


@Component({
  selector: 'app-generarfactura',
  templateUrl: './generarfactura.component.html',
  styleUrls: ['./generarfactura.component.css']
})
export class GenerarfacturaComponent implements OnInit {

  public cliente: Cliente;
  public factura: Factura;
  private dialogConfig;
  private idCliente: any;
  private idFactura: any;
  constructor(
    private repoService: RepositoryService,
    private errorService: ErrorHandlerService,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit() {
  
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.idFactura = params.idProducto;
        this.idCliente = params.idClien;
      }
    );
    this.FacturaID();
   this.getOwnerById();
    this.dialogConfig = {
      height: "60%",
      width: "40%",
      disableClose: true,
      data: {}
    };
  }
 
  private FacturaID = () => {
    
    //  this.idCliente = this.facturaService.getId;;
      let ownerByIdUrl: string = `api/facturas/${this.idFactura}`;
      this.repoService.getData(ownerByIdUrl).subscribe(
        res => {
          this.factura = res as Factura;
         
        },
        error => {
          this.errorService.dialogConfig = this.dialogConfig;
          this.errorService.handleError(error);
        }
      );
     
      return this.factura;
    };
  
 
  private getOwnerById = () => {
    
  //  this.idCliente = this.facturaService.getId;;
    let ownerByIdUrl: string = `api/clientes/${this.idCliente}`;
    this.repoService.getData(ownerByIdUrl).subscribe(
      res => {
        this.cliente = res as Cliente;
       
      },
      error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      }
    );
   
    return this.cliente;
  };
}
