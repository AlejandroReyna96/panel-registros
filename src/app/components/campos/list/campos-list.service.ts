import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CampoProcesoDTO } from '../../../compartidos/DTOs/proceso/CampoProcesoDTO';

@Injectable({
  providedIn: 'root',
})
export class CamposListService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  // ========================================
  // LISTAR CAMPOS POR SECCIÓN
  // GET /api/CamposProceso/seccion/{id}
  // ========================================
  listarPorSeccion(idSeccion: number) {
    return this.http.get<CampoProcesoDTO[]>(
      `${this.baseUrl}/CamposProceso/seccion/${idSeccion}`
    );
  }

  // ========================================
  // ELIMINAR CAMPO (soft delete)
  // DELETE /api/CamposProceso/{id}
  // ========================================
  eliminar(idCampo: number) {
    return this.http.delete(
      `${this.baseUrl}/CamposProceso/${idCampo}`
    );
  }

  // ========================================
  // REORDENAR CAMPOS
  // PUT /api/CamposProceso/reordenar
  // ========================================
  reordenar(idSeccion: number, idsOrdenados: number[]) {
    return this.http.put(
      `${this.baseUrl}/CamposProceso/reordenar`,
      {
        iIdSeccionProceso: idSeccion,
        idsOrdenados
      }
    );
  }
}
