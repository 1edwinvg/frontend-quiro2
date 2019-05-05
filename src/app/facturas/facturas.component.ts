import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { RepositoryService } from "../shared/repository.service";
import { ErrorHandlerService } from "../shared/error-handler.service";
import { Cliente } from "../_interface/cliente.model";
import {
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatSelect
} from "@angular/material";
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { Factura } from "src/app/_interface/factura.model";
import { SuccessDialogComponent } from "../shared/dialogs/success-dialog/success-dialog.component";
import { ReplaySubject, Subject, Observable } from "rxjs";
import { Producto } from "../_interface/productos.model";
import { takeUntil, take, map } from "rxjs/operators";
import { element } from "@angular/core/src/render3/instructions";

@Component({
  selector: "app-facturas",
  templateUrl: "./facturas.component.html",
  styleUrls: ["./facturas.component.css"]
})
export class FacturasComponent implements OnInit {
  public displayedColumns = [
    "dni",
    "nombre",
    "apellido",
    "telefono",
    "factura"
  ];
  public displayedColumnsProduct = [
    "nombre"
  ];

  // los atributos par amanejar productos

  private productos: Producto[];
  private productoControl: FormControl = new FormControl();
  private selectFormControl;
  // todos los atributos relacionado con cliente
  public dataSource = new MatTableDataSource<Cliente>();
  private clienteForm: FormGroup;
  private idCliente: string;
  private cliente: any = [];
  private activarTabla: Boolean = false;
  // atributos para el formulario de facturas
  public facturaForm: FormGroup;
  private dialogConfig;

  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private repoService: RepositoryService,
    private errorService: ErrorHandlerService,
    private router: Router,
    private location: Location,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
   
    this.selectFormControl = new FormControl('', [Validators.required]);
    this.facturaForm = new FormGroup({
      descripcion: new FormControl("", [
        Validators.required,
        Validators.maxLength(20)
      ])
    });
    this.dialogConfig = {
      height: "200px",
      width: "400px",
      disableClose: true,
      data: {}
    };
    this.getProductos().subscribe(produc => this.productos = produc);
    this.productoControl.setValue(this.productos);
    this.getAllOwners();
    
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.facturaForm.controls[controlName].hasError(errorName);
  };
    
  public getProductos(): Observable<Producto[]> {
    return  this.repoService.getData("api/productos").pipe(
      map(produc => produc as Producto[])
    );
  }
  
  public getIdProducto = id => {
    console.log(id);
  }

  public getAllOwners = () => {
    this.repoService.getData("api/clientes").subscribe(
      res => {
        this.dataSource.data = res as Cliente[];
      },
      error => {
        this.errorService.handleError(error);
      }
    );
  };

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.activarTabla = true;
    if (this.dataSource.filter === "") this.activarTabla = false;
  };

  public onCancel = () => {
    let url: string = `/inicio`;
    console.log(url);
    this.router.navigate([url]);
  };

  public createFactura = facturaFormValue => {
    if (this.facturaForm.valid) {
      this.executeFacturaCreation(facturaFormValue);
      console.log(facturaFormValue);
    }
  };

  private getOwnerById = id => {
  
    let ownerByIdUrl: string = `api/clientes/${id}`;
    this.repoService.getData(ownerByIdUrl).subscribe(
      res => {
        this.cliente = res;
        this.cliente = Array.of(this.cliente);
        this.activarTabla = false;
      },
      error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      }
    );
    return this.cliente;
  };

  private executeFacturaCreation = facturaFormValue => {
    let factura: Factura = {
      descripcion: facturaFormValue.factura,
      observacion: facturaFormValue.observacion,
      cliente: facturaFormValue.cliente
    };

    let apiUrl = `/facturas/create/${this.idCliente}`;
    this.repoService.create(apiUrl, factura).subscribe(
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
