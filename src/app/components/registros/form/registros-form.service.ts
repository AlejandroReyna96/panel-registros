import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RegistroProcesoCreateDTO } from '../../../compartidos/DTOs/registro-proceso/RegistroProcesoCreateDTO';
import { RegistroProcesoDTO } from '../../../compartidos/DTOs/registro-proceso/RegistroProcesoDTO';

@Injectable({
  providedIn: 'root',
})
export class RegistrosFormService {

  private readonly srvHttp = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  /**
   * POST /api/RegistrosProceso
   * Inicia un trámite
   */
  crear(dto: RegistroProcesoCreateDTO) {
    const endpoint = `${this.baseUrl}/RegistrosProceso`;
    return this.srvHttp.post<RegistroProcesoDTO>(endpoint, dto);
  }

  /**
   * GET /api/RegistrosProceso/{id}
   * Obtiene trámite completo (valores + etapa)
   */
  obtener(id: number) {
    const endpoint = `${this.baseUrl}/RegistrosProceso/${id}`;
    return this.srvHttp.get<RegistroProcesoDTO>(endpoint);
  }

  /**
   * PUT /api/RegistrosProceso/{id}/valores
   * Guarda datos dinámicos del formulario
   */
  guardarValores(
    id: number,
    valores: Record<string, any>
  ) {
    const endpoint = `${this.baseUrl}/RegistrosProceso/${id}/valores`;
    return this.srvHttp.put<RegistroProcesoDTO>(endpoint, valores);
  }

  /**
   * DELETE /api/RegistrosProceso/{id}
   * Baja lógica del trámite
   */
  eliminar(id: number) {
    const endpoint = `${this.baseUrl}/RegistrosProceso/${id}`;
    return this.srvHttp.delete<void>(endpoint);
  }
}
