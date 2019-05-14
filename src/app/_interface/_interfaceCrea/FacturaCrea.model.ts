import{ ItemFacturaMvc } from './ItemFacturaMvc.model';
export interface FacturaMvc{
    descripcion: string;
    observacion: string;
    // fecha: Date;
    idCliente : string
    items:  ItemFacturaMvc[]  ;
}