import { Component, OnInit, ViewChild, HostListener, HostBinding, Output, EventEmitter } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialogConfig
} from "@angular/material";
import { RepositoryService } from "src/app/shared/repository.service";
import { ErrorHandlerService } from "src/app/shared/error-handler.service";
import { FacturaServiceId } from "../../buscar-facturas-id/FacturaServiceId";
import { DetalleComponent } from "../../buscar-facturas-id/detalle/detalle.component";
import { Factura } from "src/app/_interface/factura.model";
import { facturaClienteService } from "../facturaClienteService";

@Component({
  selector: "app-detalles",
  templateUrl: "./detalles.component.html",
  styleUrls: ["./detalles.component.css"]
})
export class DetallesComponent implements OnInit {
  private factura: any = [];
  private dialogConfig;
   private idClien: any;
   @Output() idUser: EventEmitter<any> = new EventEmitter();

  public displayedColumns = ["id", "fecha", "detalles"];
  public dataSource = new MatTableDataSource<Factura>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private repository: RepositoryService,
    private errorService: ErrorHandlerService,
    private facturaService: FacturaServiceId,
    public dialogRef: MatDialogRef<DetalleComponent>,
    private facturaClienteSer?: facturaClienteService
  ) {}

  ngOnInit() {
    this.idClien = this.facturaService.getId();
    // this.facturaClienteSer.setId(1);
    this.getFacturas();
    this.dialogConfig = {
      height: "200px",
      width: "400px",
      disableClose: true,
      data: {}
    };
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public onCancel(): void {
    this.dialogRef.close();
  }

  public getFacturas = () => {
    console.log("este es el id" + this.idClien);
    let IdUrl: string = `api/clientefactura/${this.idClien}`;
    this.repository.getData(IdUrl).subscribe(
      res => {
        this.dataSource.data = res as Factura[];
      },
      error => {
        this.errorService.handleError(error);
      }
    );
  };
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

 
  public detalles = (id: string) => {
    
    this.idUser.emit(this.facturaClienteSer.setId(id));
     this.dialogRef.close();         
  };
}
