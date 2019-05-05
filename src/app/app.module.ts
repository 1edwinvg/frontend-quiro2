import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { LayoutComponent } from "./layout/layout.component";
import { RoutingModule } from "./routing/routing.module";
import { HeaderComponent } from "./navigation/header/header.component";
import { SidenavListComponent } from "./navigation/sidenav-list/sidenav-list.component";
import { HttpClientModule } from "@angular/common/http";
import { NotFoundComponent } from "./error-pages/not-found/not-found.component";
import { ServerErrorComponent } from "./error-pages/server-error/server-error.component";
import { SharedModule } from "./shared/shared.module";
import { InicioComponent } from "./inicio/inicio.component";

import { LoginModule } from "./login/login.module";
import { AlertComponent } from "./login/_directives/alert.component";
import { FacturasComponent } from "./facturas/facturas.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductosComponent } from "./productos/productos.component";
import { DialogBorrarComponent } from "./productos/modales/dialog-borrar/dialog-borrar.component";
import { DialogActualizarComponent } from "./productos/modales/dialog-actualizar/dialog-actualizar.component";
import { DialogCrearComponent } from "./productos/modales/dialog-crear/dialog-crear.component";
import { ProductoService } from "./productos/producto.service";
import { BuscadorPipe } from "./pipes/buscador.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    InicioComponent,
    HeaderComponent,
    SidenavListComponent,
    NotFoundComponent,
    ServerErrorComponent,
    AlertComponent,
    FacturasComponent,
    ProductosComponent,
    DialogBorrarComponent,
    DialogActualizarComponent,
    DialogCrearComponent,
    BuscadorPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RoutingModule,
    HttpClientModule,
    LoginModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  entryComponents: [
    DialogBorrarComponent,
    DialogActualizarComponent,
    DialogCrearComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
