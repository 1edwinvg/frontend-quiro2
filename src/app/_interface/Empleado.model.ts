//import { Cliente } from './cliente'
export interface Empleado{
    id: string;
    dni: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: any;
    tipoEmpleado: string;

    //accounts?: Cliente;
}