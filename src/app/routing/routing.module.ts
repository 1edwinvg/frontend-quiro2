import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../error-pages/not-found/not-found.component';
import { ServerErrorComponent } from '../error-pages/server-error/server-error.component';
import { InicioComponent } from '../inicio/inicio.component';
import { LoginComponent } from '../login/login/login.component';
import { AuthGuard } from '../login/_directives/auth.guard';
 


const ownerRoutes: Routes = [
  
  { path: 'login', component: LoginComponent  },
  { path: 'inicio', component: InicioComponent }  ,
  { path: 'empleados', loadChildren: "./../empleados/componente.module#ComponenteModule" },
  { path: 'clientes', loadChildren: "./../clientes/componente.cliente.module#ComponenteClienteModule" },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ownerRoutes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
