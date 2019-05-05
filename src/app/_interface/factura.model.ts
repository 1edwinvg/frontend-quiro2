import{ Cliente } from './cliente.model';
export interface Factura {
    descripcion: string;
    observacion: string;
    cliente: Cliente;
}