import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Cliente } from 'src/app/_interface/cliente.model';
import { RepositoryService } from 'src/app/shared/repository.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  public displayedColumns = [ 'nombre', 'apellido', 'telefono', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Cliente>(); 

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
    this.repoService.getData('api/clientes')
    .subscribe(res => {
      this.dataSource.data = res as Cliente[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    let url: string = `/clientes/details/${id}`;
    console.log(url);
    this.router.navigate([url]);
    

  }

  public redirectToUpdate = (id: string) => {
    let url: string = `/clientes/update/${id}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (id: string) => {
    let url: string = `/clientes/delete/${id}`;
    this.router.navigate([url]);
  }
}
