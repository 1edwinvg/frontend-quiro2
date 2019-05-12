import { Component, OnInit, ViewChild, Injectable } from "@angular/core";
import { Producto } from "src/app/_interface/productos.model";
import { RepositoryService } from "src/app/shared/repository.service";
import { MatDialog, MatDialogRef } from "@angular/material";
import { ErrorHandlerService } from "src/app/shared/error-handler.service";
import { Location } from "@angular/common";
import { SuccessDialogComponent } from "src/app/shared/dialogs/success-dialog/success-dialog.component";
import { ProductoService } from "../../producto.service";


// import { ProductoPadre } from '../_interface/ProductoPadre.model';

@Component({
  selector: "app-dialog-borrar",
  templateUrl: "./dialog-borrar.component.html",
  styleUrls: ["./dialog-borrar.component.css"]
})
export class DialogBorrarComponent implements OnInit {

  private dialogConfig;
  public producto: Producto;
  
  constructor(
    private location: Location,
    private repository: RepositoryService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private productoService: ProductoService,
    public dialogRef: MatDialogRef<DialogBorrarComponent>
  ) {
    
  }
 
  

  ngOnInit() {
    this.dialogConfig = {
      height: "200px",
      width: "400px",
      disableClose: true,
      data: {}
    };

    this.getProductoById();
  }

  public onCancel() : void {
    this.dialogRef.close();
  }

  private getProductoById = () => {

    let id: any = this.productoService.getId();
    console.log("este es el id" + id);

    let productoByIdUrl: string = `api/productos/${id}`;

    this.repository.getData(productoByIdUrl).subscribe(
      res => {
        this.producto = res as Producto;
      },
      error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      }
    );
  };

  public deleteProducto = (id) => {
    let deleteUrl: string = `api/productos/desactivarPro/${id}`;
    this.repository.update(deleteUrl,this.producto).subscribe(
      res => {
        let dialogRef = this.dialog.open(
          SuccessDialogComponent,
          this.dialogConfig
        );

        dialogRef.afterClosed().subscribe(result => {
         this.dialogRef.close();
         window.location.reload();
        });
      },
      error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      }
    );
  };
}
