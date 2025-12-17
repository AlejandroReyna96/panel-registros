import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { SeccionProcesoCreateDTO } from '../../../compartidos/DTOs/seccionesProceso/SeccionProcesoCreateDTO';
import { SeccionProcesoDTO } from '../../../compartidos/DTOs/seccionesProceso/SeccionProcesoDTO';

@Injectable({
  providedIn: 'root',
})
export class SeccionesFormService {

  private readonly srvHttp = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  /**
   * GET /api/SeccionesProceso/{id}
   */
  obtener(id: number) {
    const endpoint = `${this.baseUrl}/SeccionesProceso/${id}`;
    return this.srvHttp.get<SeccionProcesoDTO>(endpoint);
  }

  /**
   * POST /api/SeccionesProceso
   */
  crear(dto: SeccionProcesoCreateDTO) {
    const endpoint = `${this.baseUrl}/SeccionesProceso`;
    return this.srvHttp.post<SeccionProcesoDTO>(endpoint, dto);
  }

  /**
   * PUT /api/SeccionesProceso/{id}
   */
  actualizar(id: number, dto: SeccionProcesoCreateDTO) {
    const endpoint = `${this.baseUrl}/SeccionesProceso/${id}`;
    return this.srvHttp.put<SeccionProcesoDTO>(endpoint, dto);
  }
}
