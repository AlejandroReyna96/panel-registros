import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { SeccionProcesoDTO } from '../../../compartidos/DTOs/seccionesProceso/SeccionProcesoDTO';

@Injectable({
  providedIn: 'root',
})
export class SeccionesListService {

  private readonly srvHttp = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  /**
   * GET /api/SeccionesProceso/tipo/{idTipo}
   */
  listar(idTipo: number) {
    const endpoint = `${this.baseUrl}/SeccionesProceso/tipo/${idTipo}`;
    return this.srvHttp.get<SeccionProcesoDTO[]>(endpoint);
  }

  /**
   * DELETE /api/SeccionesProceso/{id}
   */
  eliminar(id: number) {
    const endpoint = `${this.baseUrl}/SeccionesProceso/${id}`;
    return this.srvHttp.delete(endpoint);
  }

  reordenar(idProceso: number, idsOrdenados: number[]) {
    const endpoint = `${this.baseUrl}/SeccionesProceso/reordenar`;
    return this.srvHttp.put(endpoint, {
      iIdProceso: idProceso,   // 👈 ESTE ES EL FIX
      idsOrdenados,
    });
  }
}
