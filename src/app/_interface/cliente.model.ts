import{ Factura } from './factura.model';
export interface Cliente {
    id: any;
    dni: string;
    nombre: string;
    apellido: string;
    email: string;
    edad: any;
    movil: any;
    dolencia: string;
    factura: Factura;
}
