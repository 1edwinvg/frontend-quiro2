import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Factura } from 'src/app/_interface/factura.model';
import { FacturaServiceId } from '../FacturaServiceId';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  private factura: any=[];
  private dialogConfig;
 
  constructor(
    private dialog: MatDialog,
    private repository: RepositoryService,
    private errorService: ErrorHandlerService,
    private facturaServiceId: FacturaServiceId,
    public dialogRef: MatDialogRef<DetalleComponent>
  ) { }

  ngOnInit() {
    this.getFacturaById();
    this.dialogConfig = {
      height: "300px",
      width: "300px",
      disableClose: true,
      data: {}
    };
  }
  public onCancel() : void {
    this.dialogRef.close();
  }

  private getFacturaById = () => {

    let id: any = this.facturaServiceId.getId();
    console.log("este es el id" + id);

    let productoByIdUrl: string = `api/facturas/${id}`;

    this.repository.getData(productoByIdUrl).subscribe(
      res => {
        this.factura = res as Factura[];
        this.factura = Array.of(this.factura);
      },
      error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      }
    );
  };

}
