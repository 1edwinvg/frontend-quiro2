import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router } from '@angular/router';
import { Factura } from 'src/app/_interface/factura.model';

@Component({
  selector: 'app-buscar-facturas-id',
  templateUrl: './buscar-facturas-id.component.html',
  styleUrls: ['./buscar-facturas-id.component.css']
})
export class BuscarFacturasIdComponent implements OnInit {

 public displayedColumns = [
    "id",
    "descripcion",
    "observacion",
    "fecha",
    "total"
  ];
  public dataSource = new MatTableDataSource<Factura>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private repoService: RepositoryService,
    private errorService: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getFacturas();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public getFacturas = () => {
    this.repoService.getData("api/facturas").subscribe(
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
}
