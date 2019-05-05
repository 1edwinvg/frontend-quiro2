import { RepositoryService } from "../../shared/repository.service";
import { Component, OnInit } from "@angular/core";
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
import { EmpleadoCrea } from "src/app/_interface/_interfaceCrea/EmpleadoCrea.model";

@Component({
  selector: "app-empleado-create",
  templateUrl: "./empleado-create.component.html",
  styleUrls: ["./empleado-create.component.css"]
})
export class EmpleadoCreateComponent implements OnInit {
  public empleadoForm: FormGroup;
  private dialogConfig;

  constructor(
    private location: Location,
    private repository: RepositoryService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.empleadoForm = new FormGroup({
      nombre: new FormControl("", [
        Validators.required,
        Validators.maxLength(60)
      ]),
      // dateOfBirth: new FormControl(new Date()),
      apellido: new FormControl("", [
        Validators.required,
        Validators.maxLength(60)
      ]),
      email: new FormControl("", [Validators.required, Validators.email]),
      //movil: new FormControl("", [Validators.required, this.phoneNumberValidator ]),
      telefono: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(9)
      ]),
      tipoEmpleado: new FormControl("", [
        Validators.required,
        Validators.maxLength(60)
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
    return this.empleadoForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  public createEmpleado = empleadoFormValue => {
    if (this.empleadoForm.valid) {
      this.executeOwnerCreation(empleadoFormValue);
      console.log(empleadoFormValue);
    }
  };

  private executeOwnerCreation = empleadoFormValue => {
    let empleado: EmpleadoCrea = {
      nombre: empleadoFormValue.nombre,
      apellido: empleadoFormValue.apellido,
      email: empleadoFormValue.email,
      telefono: empleadoFormValue.telefono,
      tipoEmpleado: empleadoFormValue.tipoEmpleado
    };

    let apiUrl = "api/empleados/create";
    this.repository.create(apiUrl, empleado).subscribe(
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
      }
    );
  };
}
