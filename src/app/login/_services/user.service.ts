import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Empleado } from '../../_interface/Empleado.model';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Empleado []>(`/usuarios`);
    }

    getById(id: number) {
        return this.http.get(`/usuarios/` + id);
    }

    register(user: Empleado ) {
        return this.http.post(`/usuarios/register`, user);
    }

    update(user: Empleado ) {
        return this.http.put(`/usuarios/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`/usuarios/` + id);
    }
}