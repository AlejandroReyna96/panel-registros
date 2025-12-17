import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CatEtapaDTO } from '../../../compartidos/DTOs/cat-etapas/CatEtapaDTO';
import { CatEtapaCreateDTO } from '../../../compartidos/DTOs/cat-etapas/CatEtapaCreateDTO';

@Injectable({
  providedIn: 'root',
})
export class CatEtapasFormService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  // -------------------------
  // OBTENER
  // GET /api/EstadosProceso/{id}
  // -------------------------
  obtener(id: number) {
    return this.http.get<CatEtapaDTO>(
      `${this.baseUrl}/EstadosProceso/${id}`
    );
  }

  // -------------------------
  // CREAR
  // POST /api/EstadosProceso
  // -------------------------
  crear(dto: CatEtapaCreateDTO) {
    return this.http.post<CatEtapaDTO>(
      `${this.baseUrl}/CatEtapas`,
      dto
    );
  }

  // -------------------------
  // ACTUALIZAR
  // PUT /api/EstadosProceso/{id}
  // -------------------------
  actualizar(id: number, dto: CatEtapaCreateDTO) {
    return this.http.put<CatEtapaDTO>(
      `${this.baseUrl}/CatEtapas/${id}`,
      dto
    );
  }
}
