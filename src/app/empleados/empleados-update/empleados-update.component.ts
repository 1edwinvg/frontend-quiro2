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
import { ActivatedRoute } from "@angular/router";
import { Empleado } from "../../_interface/Empleado.model";

@Component({
  selector: "app-empleados-update",
  templateUrl: "./empleados-update.component.html",
  styleUrls: ["./empleados-update.component.css"]
})
export class EmpleadosUpdateComponent implements OnInit {
  public ownerForm: FormGroup;
  private dialogConfig;
  public owner: Empleado;

  constructor(
    private location: Location,
    private repository: RepositoryService,
    private dialog: MatDialog,
    private errorService: ErrorHandlerService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ownerForm = new FormGroup({
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
      telefono: new FormControl("", [
        Validators.required,
        this.phoneNumberValidator
      ])
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
    return this.ownerForm.controls[controlName].hasError(errorName);
  };

  public onCancel = () => {
    this.location.back();
  };

  private getOwnerById = () => {
    let ownerId: string = this.activeRoute.snapshot.params["id"];
    console.log(
      "Valor owneriD, peticion al backend para actualizar empleado: " + ownerId
    );
    let ownerByIdUrl: string = `api/empleados/${ownerId}`;

    console.log(
      "Peticion al backend para actualizar empleado: " + ownerByIdUrl
    );

    this.repository.getData(ownerByIdUrl).subscribe(
      res => {
        this.owner = res as Empleado;
        this.ownerForm.patchValue(this.owner);
      },
      error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      }
    );
  };

  public updateOwner = ownerFormValue => {
    if (this.ownerForm.valid) {
      this.executeOwnerUpdate(ownerFormValue);
    }
  };

  private executeOwnerUpdate = ownerFormValue => {
    (this.owner.nombre = ownerFormValue.nombre),
      (this.owner.apellido = ownerFormValue.apellido),
      (this.owner.email = ownerFormValue.email),
      (this.owner.telefono = ownerFormValue.telefono);
    let apiUrl = `api/empleados/update/${this.owner.id}`;
    this.repository.update(apiUrl, this.owner).subscribe(
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
