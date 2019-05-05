import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatDialog } from "@angular/material";
import { RepositoryService } from "src/app/shared/repository.service";
import { ErrorHandlerService } from "src/app/shared/error-handler.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { SuccessDialogComponent } from "src/app/shared/dialogs/success-dialog/success-dialog.component";
import { ProductoService } from "../../producto.service";
import { Producto } from "src/app/_interface/productos.model";

@Component({
  selector: "app-dialog-actualizar",
  templateUrl: "./dialog-actualizar.component.html",
  styleUrls: ["./dialog-actualizar.component.css"]
})
export class DialogActualizarComponent implements OnInit {
  public productoForm: FormGroup;
  private dialogConfig;
  public productoCrea: Producto;

  constructor(
    private repository: RepositoryService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private productoService: ProductoService,
    public dialogRef: MatDialogRef<DialogActualizarComponent>
  ) {}

  ngOnInit() {
    // declaramos el nombre que le hemos puesto al formulario -- clienteForm (FormBuilder)
    this.productoForm = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.maxLength(60)
      ]),

      precio: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
       
      ])
    });
    this.dialogConfig = {
      height: "200px",
      width: "400px",
      disableClose: true,
      data: {}
    };

    this.getProductoById();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.productoForm.controls[controlName].hasError(errorName);
  };

  private getProductoById = () => {
    let id: any = this.productoService.getId();

    let productoByIdUrl: string = `api/productos/${id}`;

    this.repository.getData(productoByIdUrl).subscribe(
      res => {
        this.productoCrea = res as Producto;
        this.productoForm.patchValue(this.productoCrea);
      },
      error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      }
    );
  };

  public updateProducto = ownerFormValue => {
    if (this.productoForm.valid) {
      this.executeProductoUpdate(ownerFormValue);
    }
  };

  private executeProductoUpdate = productoFormValue => {
    (this.productoCrea.nombre = productoFormValue.nombre),
      (this.productoCrea.precio = productoFormValue.precio);
    let apiUrl = `api/productos/update/${this.productoCrea.id}`;
    this.repository.update(apiUrl, this.productoCrea).subscribe(
      res => {
        let dialogRef = this.dialog.open(
          SuccessDialogComponent,
          this.dialogConfig
        );

        dialogRef.afterClosed().subscribe(result => {
          this.dialogRef.close();
        });
      },
      error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      }
    );
  };
  public onCancel(): void {
    this.dialogRef.close();
  }
}
