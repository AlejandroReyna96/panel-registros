import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProcesoCompletoDTO } from '../../../compartidos/DTOs/proceso/ProcesoCompletoDTO';
import { ProcesoCreateDTO } from '../../../compartidos/DTOs/proceso/ProcesoCreateDTO';
import { ProcesoDTO } from '../../../compartidos/DTOs/proceso/ProcesoDTO';

@Injectable({
  providedIn: 'root',
})
export class ProcesoFormService {

  private readonly srvHttp = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  obtener(id: number) {
    const endpoint = `${this.baseUrl}/Procesos/${id}`;
    return this.srvHttp.get<ProcesoDTO>(endpoint);
  }

  crear(dto: ProcesoCreateDTO) {
    const endpoint = `${this.baseUrl}/Procesos`;
    return this.srvHttp.post<ProcesoDTO>(endpoint, dto);
  }

  actualizar(id: number, dto: ProcesoCreateDTO) {
    const endpoint = `${this.baseUrl}/Procesos/${id}`;
    return this.srvHttp.put<ProcesoDTO>(endpoint, dto);
  }

  obtenerProcesoCompleto(idProceso: number) {
    const endpoint = `${this.baseUrl}/Procesos/GetProcesoCompleto/${idProceso}`;
    return this.srvHttp.get<ProcesoCompletoDTO>(endpoint);
  }
}
