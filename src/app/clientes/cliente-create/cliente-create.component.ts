import { Component, OnInit } from "@angular/core";
import { RepositoryService } from "../../shared/repository.service";
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Location } from "@angular/common";
import { MatDialog } from "@angular/material";
import { SuccessDialogComponent } from "../../shared/dialogs/success-dialog/success-dialog.component";
import { ErrorHandlerService } from "../../shared/error-handler.service";
import { ClienteCrea } from "../../_interface/_interfaceCrea/Clientecrea.model";

@Component({
  selector: "app-cliente-create",
  templateUrl: "./cliente-create.component.html",
  styleUrls: ["./cliente-create.component.css"]
})
export class ClienteCreateComponent implements OnInit {
  public clienteForm: FormGroup;
  private dialogConfig;
  private mensajeError: string;

  constructor(
    private location: Location,
    private repository: RepositoryService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.clienteForm = new FormGroup({
      dni: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i)
      ]),
      nombre: new FormControl("", [
        Validators.required,
        Validators.maxLength(60)
      ]),
      // dateOfBirth: new FormControl(new Date()),
      apellido: new FormControl("", [
        Validators.required,
        Validators.maxLength(100)
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      //movil: new FormControl("", [Validators.required, this.phoneNumberValidator ]),
      movil: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(9)
      ]),
      dolencia: new FormControl("", [
        Validators.required,
        Validators.maxLength(60)
      ]),
      edad: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.max(100)
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
    return this.clienteForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  public createCliente = clienteFormValue => {
    if (this.clienteForm.valid) {
      this.executeClienteCreation(clienteFormValue);
      console.log(clienteFormValue);
    }
  };

  /* le pasamos el value de los inputs*/
  private executeClienteCreation = clienteFormValue => {
    let cliente: ClienteCrea = {
      dni: clienteFormValue.dni,
      nombre: clienteFormValue.nombre,
      apellido: clienteFormValue.apellido,
      edad: clienteFormValue.edad,
      email: clienteFormValue.email,
      movil: clienteFormValue.movil,
      dolencia: clienteFormValue.dolencia
    };

    // DEFINE URL PARA LA PETICION AL BACKEND
    let apiUrl = "api/clientes/create";
    this.repository.create(apiUrl, cliente).subscribe(
      res => {
        let dialogRef = this.dialog.open(
          SuccessDialogComponent,
          this.dialogConfig
        );

        //we are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed().subscribe(result => {
          this.location.back();
        });
      },
      error => {
        this.errorService.dialogConfig = { ...this.dialogConfig };
        this.errorService.handleError(error);
        if (error.includes("ConstraintViolationException")) {
          this.mensajeError = "el usuario ya existe";
        }
      }
    );
  };
}
