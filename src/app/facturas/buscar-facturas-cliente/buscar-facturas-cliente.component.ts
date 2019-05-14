import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Cliente } from 'src/app/_interface/cliente.model';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router } from '@angular/router';
import { FacturaServiceId } from '../buscar-facturas-id/FacturaServiceId';
import { DetallesComponent } from './detalles/detalles.component';

@Component({
  selector: 'app-buscar-facturas-cliente',
  templateUrl: './buscar-facturas-cliente.component.html',
  styleUrls: ['./buscar-facturas-cliente.component.css']
})
export class BuscarFacturasClienteComponent implements OnInit {

  private dialogConfig;
 
 public displayedColumns = [
    "nombre",
    "dni",
    "facturas"
  ];
  public dataSource = new MatTableDataSource<Cliente>();

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
  };

  public detalles = (id: string) => {
    this.facturaService.setId(id);
    this.dialog.open(DetallesComponent, this.dialogConfig);
  };

}
