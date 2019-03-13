import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { OwnerRoutingModule } from "./empleado-routing/empleado-routing.module";
import { AccountDataComponent } from "./empleado-details/account-data/account-data.component";
import { EmpleadoCreateComponent } from "./empleado-create/empleado-create.component";
import { EmpleadoDeleteComponent } from "./empleado-delete/empleado-delete.component";
import { EmpleadoDataComponent } from "./empleado-details/empleado-data/empleado-data.component";
import { EmpleadoDetailsComponent } from "./empleado-details/empleado-details.component";
import { EmpleadoListComponent } from "./empleado-list/empleado-list.component";
import { EmpleadosUpdateComponent } from "./empleados-update/empleados-update.component";



@NgModule({
  imports: [
    CommonModule,
    OwnerRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    EmpleadoListComponent,
    EmpleadoDetailsComponent,
    EmpleadoDataComponent,
    AccountDataComponent,
    EmpleadoCreateComponent,
    EmpleadoDeleteComponent,
    EmpleadosUpdateComponent
    
  ]
})
export class ComponenteModule {}
