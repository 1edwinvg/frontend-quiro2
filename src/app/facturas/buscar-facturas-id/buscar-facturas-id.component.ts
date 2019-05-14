import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router } from '@angular/router';
import { Factura } from 'src/app/_interface/factura.model';
import { DetalleComponent } from './detalle/detalle.component';
import { FacturaServiceId } from './FacturaServiceId';
import { ProductoService } from 'src/app/productos/producto.service';

@Component({
  selector: 'app-buscar-facturas-id',
  templateUrl: './buscar-facturas-id.component.html',
  styleUrls: ['./buscar-facturas-id.component.css']
})
export class BuscarFacturasIdComponent implements OnInit {

  
  private dialogConfig;
 
 public displayedColumns = [
    "id",
    "descripcion",
    "fecha",
    "total",
    "detalles"
  ];
  public dataSource = new MatTableDataSource<Factura>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private repoService: RepositoryService,
    private errorService: ErrorHandlerService,
    private router: Router,
    private dialog?: MatDialog,
    private facturaService?: FacturaServiceId
  ) {}

  ngOnInit() {
    this.getFacturas();
    this.dialogConfig = {
      height: "60%",
      width: "40%",
      disableClose: true,
      data: {}
    };
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public getFacturas = () => {
   let factura: Object[];
    this.repoService.getData("api/facturas").subscribe(
      res => {
        this.dataSource.data = res as Factura[];
        factura = res  as Factura[];
        console.log(factura);//nos muestra todo lo que nos trae de facturas.
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
    this.dialog.open(DetalleComponent, this.dialogConfig);
  };
}
