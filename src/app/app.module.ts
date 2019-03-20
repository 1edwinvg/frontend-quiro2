import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { RoutingModule } from './routing/routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { SharedModule } from './shared/shared.module';
import { InicioComponent } from './inicio/inicio.component';

import { LoginModule } from './login/login.module';
import { AlertComponent } from './login/_directives/alert.component';


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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    RoutingModule,
    HttpClientModule,
    LoginModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
