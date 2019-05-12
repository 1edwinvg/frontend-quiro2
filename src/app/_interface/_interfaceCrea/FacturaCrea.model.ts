import{ ItemFacturaMvc } from './ItemFacturaMvc.model';
export interface FacturaMvc{
    descripcion: string;
    observacion: string;
    idCliente : string
    items:  ItemFacturaMvc[]  ;
}