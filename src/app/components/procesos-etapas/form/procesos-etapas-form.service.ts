import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CatEtapaDTO } from '../../../compartidos/DTOs/cat-etapas/CatEtapaDTO';
import { ProcesoEtapaCreateDTO } from '../../../compartidos/DTOs/procesos-etapas/ProcesoEtapaCreateDTO';
import { ProcesoEtapaDTO } from '../../../compartidos/DTOs/procesos-etapas/ProcesoEtapaDTO';

@Injectable({
  providedIn: 'root',
})
export class ProcesosEtapasFormService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiURL;

  listarCatalogoEtapas() {
    return this.http.get<CatEtapaDTO[]>(
      `${this.baseUrl}/CatEtapas`
    );
  }

  crear(dto: ProcesoEtapaCreateDTO) {
    return this.http.post(
      `${this.baseUrl}/ProcesosEtapas`,
      dto
    );
  }
}
