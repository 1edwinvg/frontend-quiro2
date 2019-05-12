import { ItemFacturaMvc } from "./_interfaceCrea/ItemFacturaMvc.model";
import { Cliente } from "./cliente.model";

export interface Factura {
    id: string;
    descripcion: string;
    observacion: string;
    cliente: Cliente;
    items:  ItemFacturaMvc;
    createAt: any;
}