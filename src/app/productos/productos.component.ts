import { Component, OnInit, ViewChild, Input, Injectable } from "@angular/core";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { RepositoryService } from "../shared/repository.service";
import { ErrorHandlerService } from "../shared/error-handler.service";
import { DialogCrearComponent } from "./modales/dialog-crear/dialog-crear.component";
import { Producto } from "../_interface/productos.model";
import { DialogActualizarComponent } from "./modales/dialog-actualizar/dialog-actualizar.component";
import { DialogBorrarComponent } from "./modales/dialog-borrar/dialog-borrar.component";
import { ProductoService } from "./producto.service";

@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.css"]
})
export class ProductosComponent implements OnInit {
  public displayedColumns = ["nombre", "precio", "update", "delete"];
  public dataSource = new MatTableDataSource<Producto>();
  private dialogConfig;

  constructor(
    private repoService?: RepositoryService,
    private errorService?: ErrorHandlerService,
    private dialog?: MatDialog,
    private productoService?: ProductoService
  ) {}

  ngOnInit() {
    this.getProductos();
    this.dialogConfig = {
      height: "60%",
      width: "40%",
      disableClose: true,
      data: {}
    };
  }

  public getProductos = () => {
    this.repoService.getData("api/productos").subscribe(
      res => {
        this.dataSource.data = res as Producto[];
      },
      error => {
        this.errorService.handleError(error);
      }
    );
  };
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  public openDialogCrear(): void {
     this.dialog.open(DialogCrearComponent, this.dialogConfig);
  }

  public redirectToUpdate = (id: string) => {
    this.productoService.setId(id);
    this.dialog.open(DialogActualizarComponent, this.dialogConfig);
  };

  public redirectToDelete = (id: string) => {
    this.productoService.setId(id);
    this.dialog.open(DialogBorrarComponent, this.dialogConfig);
  };
}
