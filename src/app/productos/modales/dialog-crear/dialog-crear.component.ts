import { Component, OnInit} from "@angular/core";
import { MatDialogRef,  MatDialog } from "@angular/material";
import { RepositoryService } from "src/app/shared/repository.service";
import { ErrorHandlerService } from "src/app/shared/error-handler.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductoCrea } from "src/app/_interface/_interfaceCrea/ProductoCrea.model";
import { SuccessDialogComponent } from "src/app/shared/dialogs/success-dialog/success-dialog.component";



@Component({
  selector: "app-dialog-crear",
  templateUrl: "./dialog-crear.component.html",
  styleUrls: ["./dialog-crear.component.css"]
})
export class DialogCrearComponent  implements OnInit {
  public productoForm: FormGroup;
  private dialogConfig;
  private mensajeError: string;
  constructor(
   
    private dialog: MatDialog,
    private repository: RepositoryService,
    private errorService: ErrorHandlerService,
    public dialogRef: MatDialogRef< DialogCrearComponent>
  ) {}

  ngOnInit() {
    this.productoForm = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.maxLength(60),
        
      ]),
      precio: new FormControl("", [
        Validators.required,
        Validators.max(1000),
        Validators.pattern('\\-?\\d*\\.?\\d{1,3}'),
       
      ])
    });
    this.dialogConfig = {
      height: "200px",
      width: "400px",
      disableClose: true,
      data: {}
    };
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.productoForm.controls[controlName].hasError(errorName);
  };

  public createProducto = productoFormValue => {
    if (this.productoForm.valid) {
      this.CrearProducto(productoFormValue);
      console.log(productoFormValue);
    }
  };

  private CrearProducto = productoFormValue => {
    let producto: ProductoCrea = {
      nombre: productoFormValue.nombre,
      precio: productoFormValue.precio
    };

    // DEFINE URL PARA LA PETICION AL BACKEND
    let apiUrl = "api/productos/create";
    this.repository.create(apiUrl, producto).subscribe(
      res => {
        let dialogRef = this.dialog.open(
          SuccessDialogComponent,
          this.dialogConfig
        );

        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed().subscribe(result => {
          //aqui es donde se cierra el modal
          this.dialog.afterAllClosed;
          // window.location.reload();
          // en lugar de reload, redireccionamos a /inicio, tras crear
          this.onSubmit();
        });
      },
      error => {

        this.errorService.dialogConfig = { ...this.dialogConfig };
        this.errorService.handleError(error);
        if (error.includes('ConstraintViolationException')) {
          this.mensajeError = "el usuario ya existe";
       }

      }
    );
  };

  onSubmit(){
    //this.router.navigate(['/']);
    // window.location.href = "/";
    window.location.reload();

  }
  public onCancelProducto() : void {
    this.dialogRef.close();
  }
}
