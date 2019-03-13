import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadoCreateComponent } from '../empleado-create/empleado-create.component';
import { EmpleadoDeleteComponent } from '../empleado-delete/empleado-delete.component';
import { EmpleadoDetailsComponent } from '../empleado-details/empleado-details.component';
import { EmpleadoListComponent } from '../empleado-list/empleado-list.component';
import { EmpleadosUpdateComponent } from '../empleados-update/empleados-update.component';





const routes: Routes = [
  { path: 'lista', component: EmpleadoListComponent },
  { path: 'details/:id', component: EmpleadoDetailsComponent },
  { path: 'create', component: EmpleadoCreateComponent },
  { path: 'update/:id', component:  EmpleadosUpdateComponent },
  { path: 'delete/:id', component: EmpleadoDeleteComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class OwnerRoutingModule { }
