import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../shared/repository.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from '../../_interface/cliente.model';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  constructor(private location: Location, private repository: RepositoryService, private dialog: MatDialog, private errorService: ErrorHandlerService,
    private activeRoute: ActivatedRoute) { }

    private dialogConfig;
    public cliente: Cliente;

  ngOnInit() {
    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: {}
    }

    this.getClienteById();
  }

  public onCancel = () => {
    this.location.back();
  }

// realiza busqueda del empleado y manda la peticion al backend
  private getClienteById = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    // peticion al backend
    let ownerByIdUrl: string = `api/clientes/${id}`;
   
    this.repository.getData(ownerByIdUrl)
      .subscribe(res => {
        this.cliente = res as Cliente;
      },
      (error) => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      })
  }

  public deleteCliente = () => {
    // peticion al backend, url debe ser igual que la del delete del controlador
    let deleteUrl: string = `api/clientes/delete/${this.cliente.id}`;
    this.repository.delete(deleteUrl)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);
        
        dialogRef.afterClosed()
          .subscribe(result => {
            this.location.back();
          });
      },
      (error) => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      })
  }
}
