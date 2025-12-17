import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CatCampoDTO } from '../../../compartidos/DTOs/cat-campos/CatCampoDTO';

@Injectable({
  providedIn: 'root',
})
export class ObjetosFormService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  obtener(id: number) {
    return this.http.get<CatCampoDTO>(`${this.baseUrl}/CatCampos/${id}`);
  }

  crear(dto: Partial<CatCampoDTO>) {
    return this.http.post<CatCampoDTO>(`${this.baseUrl}/CatCampos`, dto);
  }

  actualizar(id: number, dto: Partial<CatCampoDTO>) {
    return this.http.put<CatCampoDTO>(`${this.baseUrl}/CatCampos/${id}`, dto);
  }
}
