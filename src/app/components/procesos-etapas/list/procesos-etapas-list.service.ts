import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ProcesoEtapaDTO } from '../../../compartidos/DTOs/procesos-etapas/ProcesoEtapaDTO';
import { ReordenarProcesoEtapasDTO } from '../../../compartidos/DTOs/procesos-etapas/ReordenarProcesoEtapasDTO';

@Injectable({
  providedIn: 'root',
})
export class ProcesosEtapasListService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  listarPorProceso(idProceso: number) {
    return this.http.get<ProcesoEtapaDTO[]>(
      `${this.baseUrl}/ProcesosEtapas/proceso/${idProceso}`
    );
  }

  eliminar(id: number) {
    return this.http.delete(
      `${this.baseUrl}/ProcesosEtapas/${id}`
    );
  }

  reordenar(idProceso: number, idsOrdenados: number[]) {
    return this.http.put(
      `${this.baseUrl}/ProcesosEtapas/reordenar`,
      { iIdProceso: idProceso, idsOrdenados }
    );
  }
}
