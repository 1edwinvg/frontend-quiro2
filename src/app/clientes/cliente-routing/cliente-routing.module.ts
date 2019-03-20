import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ClienteCreateComponent } from '../cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from '../cliente-delete/cliente-delete.component';
import { ClienteDetailsComponent } from '../cliente-details/cliente-details.component';
import { ClienteListComponent } from '../cliente-list/cliente-list.component';
import { ClienteUpdateComponent } from '../cliente-update/cliente-update.component';


const routes: Routes = [
    { path: 'lista', component: ClienteListComponent },
    { path: 'details/:id', component: ClienteDetailsComponent },
    { path: 'create', component: ClienteCreateComponent },
    { path: 'update/:id', component: ClienteUpdateComponent },
    { path: 'delete/:id', component: ClienteDeleteComponent }
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
  export class ClienteRoutingModule { }
  
