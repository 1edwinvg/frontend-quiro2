import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Cliente } from "../../_interface/cliente.model";
import { RepositoryService } from "src/app/shared/repository.service";
import { MatDialog } from "@angular/material";
import { ErrorHandlerService } from "src/app/shared/error-handler.service";
import { ActivatedRoute } from "@angular/router";
import { SuccessDialogComponent } from "src/app/shared/dialogs/success-dialog/success-dialog.component";
import { Location } from "@angular/common";
@Component({
  selector: "app-cliente-update",
  templateUrl: "./cliente-update.component.html",
  styleUrls: ["./cliente-update.component.css"]
})
export class ClienteUpdateComponent implements OnInit {
  public clienteForm: FormGroup;
  private dialogConfig;
  public cliente: Cliente;

  constructor(
    private location: Location,
    private repository: RepositoryService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // declaramos el nombre que le hemos puesto al formulario -- clienteForm (FormBuilder)
    this.clienteForm = new FormGroup({
      dni: new FormControl("",[
        Validators.required
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
      //edad: new FormControl("", [ Validators.required, this.phoneNumberValidator]),
    });
    this.dialogConfig = {
      height: "200px",
      width: "400px",
      disableClose: true,
      data: {}
    };

    this.getOwnerById();
  }

  phoneNumberValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const valid = /^\d+$/.test(control.value);
    return valid
      ? null
      : { invalidNumber: { valid: false, value: control.value } };
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.clienteForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  private getOwnerById = () => {
    let ownerId: string = this.activeRoute.snapshot.params["id"];
    console.log(
      "Valor owneriD, peticion al backend para actualizar cliente: " + ownerId
    );
    let ownerByIdUrl: string = `api/clientes/${ownerId}`;

    console.log(
      "Peticion al backend para actualizar clientes: " + ownerByIdUrl
    );

    this.repository.getData(ownerByIdUrl).subscribe(
      res => {
        this.cliente = res as Cliente;
        this.clienteForm.patchValue(this.cliente);
      },
      error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      }
    );
  };

  public updateOwner = ownerFormValue => {
    if (this.clienteForm.valid) {
      this.executeClienteUpdate(ownerFormValue);
    }
  };
  private executeClienteUpdate = ownerFormValue => {
    (this.cliente.dni = ownerFormValue.dni),
    (this.cliente.nombre = ownerFormValue.nombre),
      (this.cliente.apellido = ownerFormValue.apellido),
      (this.cliente.email = ownerFormValue.email),
      (this.cliente.movil = ownerFormValue.movil),
      (this.cliente.edad = ownerFormValue.edad),
      (this.cliente.dolencia = ownerFormValue.dolencia);

    // se comprueba el objeto de la peticion
    console.log(ownerFormValue);

    let apiUrl = `api/clientes/update/${this.cliente.id}`;
    this.repository.update(apiUrl, this.cliente).subscribe(
      res => {
        let dialogRef = this.dialog.open(
          SuccessDialogComponent,
          this.dialogConfig
        );

        dialogRef.afterClosed().subscribe(result => {
          this.location.back();
        });
      },
      error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      }
    );
  };
}
