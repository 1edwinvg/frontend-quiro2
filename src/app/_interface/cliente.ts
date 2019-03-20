import{ Factura } from './factura.model';
export interface Cliente {
    id: any;
    nombre: string;
    apellido: string;
    email: string;
    edad: any;
    telefono: any;
    factura: Factura;
}
