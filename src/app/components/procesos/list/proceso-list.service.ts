import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProcesoDTO } from '../../../compartidos/DTOs/proceso/ProcesoDTO';

@Injectable({
  providedIn: 'root',
})
export class ProcesoListService {

  private readonly srvHttp = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  listar() {
    const endpoint = `${this.baseUrl}/Procesos`;
    return this.srvHttp.get<ProcesoDTO[]>(endpoint);
  }

  eliminar(id: number) {
    const endpoint = `${this.baseUrl}/Procesos/${id}`;
    return this.srvHttp.delete(endpoint);
  }
}
