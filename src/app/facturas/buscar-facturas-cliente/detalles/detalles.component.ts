import { Component, OnInit, ViewChild } from "@angular/core";
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

@Component({
  selector: "app-detalles",
  templateUrl: "./detalles.component.html",
  styleUrls: ["./detalles.component.css"]
})
export class DetallesComponent implements OnInit {
  private factura: any = [];
  private dialogConfig;

  public displayedColumns = ["id", "fecha", "detalles"];
  public dataSource = new MatTableDataSource<Factura>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private repository: RepositoryService,
    private errorService: ErrorHandlerService,
    private facturaServiceId: FacturaServiceId,
    public dialogRef: MatDialogRef<DetalleComponent>,
    private facturaService?: FacturaServiceId
  ) {}

  ngOnInit() {
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
    let id: any = this.facturaServiceId.getId();
    console.log("este es el id" + id);
    let IdUrl: string = `api/clientefactura/${id}`;
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
    this.facturaService.setId(id);
    const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DetalleComponent, this.dialogConfig);
  };
}
