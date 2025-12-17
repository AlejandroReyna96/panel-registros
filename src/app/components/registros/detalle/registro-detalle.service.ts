import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RegistroProcesoDTO } from '../../../compartidos/DTOs/registro-proceso/RegistroProcesoDTO';

@Injectable({
  providedIn: 'root',
})
export class RegistroDetalleService {

  private readonly srvHttp = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  /**
   * GET /api/RegistrosProceso/{id}
   */
  obtener(id: number) {
    const endpoint = `${this.baseUrl}/RegistrosProceso/${id}`;
    return this.srvHttp.get<RegistroProcesoDTO>(endpoint);
  }

  /**
   * PUT /api/RegistrosProceso/{id}/valores
   */
  actualizarValores(id: number, valores: Record<string, any>) {
    const endpoint = `${this.baseUrl}/RegistrosProceso/${id}/valores`;
    return this.srvHttp.put(endpoint, valores);
  }
}
