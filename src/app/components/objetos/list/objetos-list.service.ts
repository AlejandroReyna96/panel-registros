import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CatCampoDTO } from '../../../compartidos/DTOs/cat-campos/CatCampoDTO';

@Injectable({
  providedIn: 'root',
})
export class ObjetosListService {
  
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  /**
   * GET: /api/CatCampos
   */
  listar() {
    return this.http.get<CatCampoDTO[]>(`${this.baseUrl}/CatCampos`);
  }

  /**
   * DELETE: /api/CatCampos/{id}
   */
  eliminar(id: number) {
    return this.http.delete(`${this.baseUrl}/CatCampos/${id}`);
  }
}
