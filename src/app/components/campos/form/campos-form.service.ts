import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CatCampoDTO } from '../../../compartidos/DTOs/cat-campos/CatCampoDTO';
import { CampoProcesoDTO } from '../../../compartidos/DTOs/proceso/CampoProcesoDTO';
import { CampoProcesoCreateDTO } from '../../../compartidos/DTOs/campo-proceso/CampoProcesoCreateDTO';
import { CampoProcesoUpdateDTO } from '../../../compartidos/DTOs/campo-proceso/CampoProcesoUpdateDTO';

@Injectable({
  providedIn: 'root',
})
export class CamposFormService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  // ======================================
  // CATÁLOGO DE OBJETOS (Cat_Campos)
  // ======================================
  listarObjetos() {
    return this.http.get<CatCampoDTO[]>(
      `${this.baseUrl}/CatCampos`
    );
  }

  // ======================================
  // CAMPOS_PROCESO
  // ======================================
  obtener(id: number) {
    return this.http.get<CampoProcesoDTO>(
      `${this.baseUrl}/CamposProceso/${id}`
    );
  }

  crear(dto: CampoProcesoCreateDTO) {
    return this.http.post(
      `${this.baseUrl}/CamposProceso`,
      dto
    );
  }

  actualizar(id: number, dto: CampoProcesoUpdateDTO) {
    return this.http.put(
      `${this.baseUrl}/CamposProceso/${id}`,
      dto
    );
  }
}
