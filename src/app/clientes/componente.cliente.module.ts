import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ClienteRoutingModule } from "./cliente-routing/cliente-routing.module";
import { ClienteCreateComponent } from "./cliente-create/cliente-create.component";
import { ClienteDeleteComponent } from "./cliente-delete/cliente-delete.component";
import { ClienteDetailsComponent } from "./cliente-details/cliente-details.component";
import { ClienteListComponent } from "./cliente-list/cliente-list.component";
import { ClienteUpdateComponent } from "./cliente-update/cliente-update.component";
//import { AccountDataComponent } from "./empleado-details/account-data/account-data.component";

@NgModule({
  imports: [
    CommonModule,
    ClienteRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
   
    ClienteCreateComponent,
    ClienteDeleteComponent,
    ClienteDetailsComponent,
    ClienteListComponent,
    ClienteUpdateComponent
  ]
})
export class ComponenteClienteModule {}
