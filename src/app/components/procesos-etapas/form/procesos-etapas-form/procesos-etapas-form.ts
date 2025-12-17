import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CatEtapaDTO } from '../../../../compartidos/DTOs/cat-etapas/CatEtapaDTO';
import { ProcesoEtapaCreateDTO } from '../../../../compartidos/DTOs/procesos-etapas/ProcesoEtapaCreateDTO';
import { ProcesosEtapasFormService } from '../procesos-etapas-form.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-procesos-etapas-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './procesos-etapas-form.html',
  styleUrl: './procesos-etapas-form.css',
})
export class ProcesosEtapasForm {

  private readonly service = inject(ProcesosEtapasFormService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly etapasCatalogo = signal<CatEtapaDTO[]>([]);

  readonly idProceso = Number(
    this.route.snapshot.paramMap.get('idProceso')
  );

  readonly model = signal<ProcesoEtapaCreateDTO>({
    iIdProceso: this.idProceso,
    iIdEtapa: 0,
    lEsInicial: false,
    lEsFinal: false,
  });

  constructor() {
    this.cargarCatalogo();
  }

  async cargarCatalogo() {
    this.loading.set(true);
    try {
      const data = await firstValueFrom(
        this.service.listarCatalogoEtapas()
      );
      this.etapasCatalogo.set(data.filter(e => e.lActivo));
    } finally {
      this.loading.set(false);
    }
  }

  async guardar() {
    if (!this.model().iIdEtapa) return;

    this.loading.set(true);
    try {
      await firstValueFrom(
        this.service.crear(this.model())
      );
      this.router.navigate([
        '/proceso',
        this.idProceso,
        'etapas'
      ]);
    } finally {
      this.loading.set(false);
    }
  }

  cancelar() {
    this.router.navigate([
      '/proceso',
      this.idProceso,
      'etapas'
    ]);
  }
}
