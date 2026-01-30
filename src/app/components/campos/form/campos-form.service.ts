import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CatCampoDTO } from '../../../compartidos/DTOs/cat-campos/CatCampoDTO';
import { CampoProcesoDTO } from '../../../compartidos/DTOs/proceso/CampoProcesoDTO';
import { CampoProcesoCreateDTO } from '../../../compartidos/DTOs/campo-proceso/CampoProcesoCreateDTO';
import { CampoProcesoUpdateDTO } from '../../../compartidos/DTOs/campo-proceso/CampoProcesoUpdateDTO';
import { DataSourceDTO } from '../../../compartidos/DTOs/DataSources/DataSourceDTO';
import { DataSourceItemDTO } from '../../../compartidos/DTOs/DataSources/DataSourceItemDTO';

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
    return this.http.get<CatCampoDTO[]>(`${this.baseUrl}/CatCampos`);
  }

  // ======================================
  // CAMPOS_PROCESO
  // ======================================
  obtener(id: number) {
    return this.http.get<CampoProcesoDTO>(`${this.baseUrl}/CamposProceso/${id}`);
  }

  crear(dto: CampoProcesoCreateDTO) {
    return this.http.post<CampoProcesoDTO>(`${this.baseUrl}/CamposProceso`, dto);
  }

  actualizar(id: number, dto: CampoProcesoUpdateDTO) {
    return this.http.put<CampoProcesoDTO>(`${this.baseUrl}/CamposProceso/${id}`, dto);
  }

  // ======================================
  // DATA SOURCES
  // ======================================
  listarDataSources() {
    return this.http.get<DataSourceDTO[]>(`${this.baseUrl}/data-sources`);
  }

  obtenerDataSourceItems(clave: string) {
    return this.http.get<DataSourceItemDTO[]>(`${this.baseUrl}/data-sources/${clave}/items`);
  }

  // ======================
  // REGLAS VISIBILIDAD
  // ======================
  listarReglasCampo(idCampoProceso: number) {
    return this.http.get<any[]>(
      `${this.baseUrl}/campos-proceso-reglas/campo/${idCampoProceso}`
    );
  }

  crearRegla(dto: any) {
    return this.http.post(
      `${this.baseUrl}/campos-proceso-reglas`,
      dto
    );
  }

  eliminarRegla(id: number) {
    return this.http.delete(
      `${this.baseUrl}/campos-proceso-reglas/${id}`
    );
  }

  // ======================================
  // CAMPOS_PROCESO (LISTAR POR PROCESO)
  // ======================================
  listarCamposProceso(idProceso: number) {
    return this.http.get<CampoProcesoDTO[]>(`${this.baseUrl}/CamposProceso/proceso/${idProceso}`);
  }
}
