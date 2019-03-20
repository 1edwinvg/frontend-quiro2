import { RepositoryService } from './../../shared/repository.service';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Empleado } from '../../_interface/Empleado.model';
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent implements OnInit, AfterViewInit {

  public displayedColumns = [ 'nombre', 'apellido', 'telefono', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Empleado>(); 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.getAllOwners();
  }

  ngAfterViewInit(): void {
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
  }

  public getAllOwners = () => {
    this.repoService.getData('api/empleados')
    .subscribe(res => {
      this.dataSource.data = res as Empleado[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    let url: string = `/empleados/details/${id}`;
    console.log(url);
    this.router.navigate([url]);
    

  }

  public redirectToUpdate = (id: string) => {
    let url: string = `/empleados/update/${id}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (id: string) => {
    let url: string = `/empleados/delete/${id}`;
    this.router.navigate([url]);
  }
}
