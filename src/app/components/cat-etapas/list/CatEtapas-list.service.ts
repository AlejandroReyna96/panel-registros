import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CatEtapaDTO } from '../../../compartidos/DTOs/cat-etapas/CatEtapaDTO';

@Injectable({
  providedIn: 'root',
})
export class CatEtapasListService {

  private readonly srvHttp = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  /**
   * GET /api/EstadosProceso
   */
  listar() {
    const endpoint = `${this.baseUrl}/CatEtapas`;
    return this.srvHttp.get<CatEtapaDTO[]>(endpoint);
  }

  /**
   * DELETE /api/EstadosProceso/{id}
   */
  eliminar(id: number) {
    const endpoint = `${this.baseUrl}/CatEtapas/${id}`;
    return this.srvHttp.delete(endpoint);
  }
}
