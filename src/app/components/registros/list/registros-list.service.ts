import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RegistroProcesoDTO } from '../../../compartidos/DTOs/registro-proceso/RegistroProcesoDTO';

@Injectable({
  providedIn: 'root',
})
export class RegistrosListService {

  private readonly srvHttp = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  /**
   * GET /api/RegistrosProceso/proceso/{idProceso}
   */
  listarPorProceso(idProceso: number) {
    const endpoint = `${this.baseUrl}/RegistrosProceso/proceso/${idProceso}`;
    return this.srvHttp.get<RegistroProcesoDTO[]>(endpoint);
  }

  /**
   * DELETE /api/RegistrosProceso/{id}
   */
  eliminar(id: number) {
    const endpoint = `${this.baseUrl}/RegistrosProceso/${id}`;
    return this.srvHttp.delete<void>(endpoint);
  }
}
