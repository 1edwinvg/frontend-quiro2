import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Cliente } from "src/app/_interface/cliente.model";
import { RepositoryService } from "src/app/shared/repository.service";
import { ErrorHandlerService } from "src/app/shared/error-handler.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Factura } from "src/app/_interface/factura.model";
import * as jspdf from "jspdf";
import html2canvas from "html2canvas";

@Component({
  selector: "app-generarfactura",
  templateUrl: "./generarfactura.component.html",
  styleUrls: ["./generarfactura.component.css"]
})
export class GenerarfacturaComponent implements OnInit {
  public cliente: Cliente;
  public factura: Factura;
  private dialogConfig;
  private idCliente: any;
  private idFactura: any;
  constructor(
    private repoService: RepositoryService,
    private errorService: ErrorHandlerService,
    private rutaActiva: ActivatedRoute
  ) {}

  ngOnInit() {
    this.rutaActiva.params.subscribe((params: Params) => {
      this.idFactura = params.idProducto;
      this.idCliente = params.idClien;
    });
    this.FacturaID();
    this.getOwnerById();
    this.dialogConfig = {
      height: "60%",
      width: "40%",
      disableClose: true,
      data: {}
    };
  }

  private FacturaID = () => {
    //  this.idCliente = this.facturaService.getId;;
    let ownerByIdUrl: string = `api/facturas/${this.idFactura}`;
    this.repoService.getData(ownerByIdUrl).subscribe(
      res => {
        this.factura = res as Factura;
      },
      error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      }
    );

    return this.factura;
  };

  private getOwnerById = () => {
    //  this.idCliente = this.facturaService.getId;;
    let ownerByIdUrl: string = `api/clientes/${this.idCliente}`;
    this.repoService.getData(ownerByIdUrl).subscribe(
      res => {
        this.cliente = res as Cliente;
      },
      error => {
        this.errorService.dialogConfig = this.dialogConfig;
        this.errorService.handleError(error);
      }
    );

    return this.cliente;
  };

  public captureScreen() {
    var data = document.getElementById("contentToConvert");
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
      pdf.save("MYPdf.pdf"); // Generated PDF
    });
  }
}
