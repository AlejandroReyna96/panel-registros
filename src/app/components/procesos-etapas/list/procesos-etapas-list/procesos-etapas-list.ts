import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProcesoEtapaDTO } from '../../../../compartidos/DTOs/procesos-etapas/ProcesoEtapaDTO';
import { ReordenarProcesoEtapasDTO } from '../../../../compartidos/DTOs/procesos-etapas/ReordenarProcesoEtapasDTO';
import { ProcesosEtapasListService } from '../procesos-etapas-list.service';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-procesos-etapas-list',
  imports: [CommonModule, DragDropModule],
  templateUrl: './procesos-etapas-list.html',
  styleUrl: './procesos-etapas-list.css',
})
export class ProcesosEtapasList {

  private readonly service = inject(ProcesosEtapasListService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly etapas = signal<ProcesoEtapaDTO[]>([]);

  readonly idProceso = Number(
    this.route.snapshot.paramMap.get('idProceso')
  );

  constructor() {
    this.cargar();
  }

  async cargar() {
    this.loading.set(true);
    try {
      const data = await firstValueFrom(
        this.service.listarPorProceso(this.idProceso)
      );
      this.etapas.set(data);
    } finally {
      this.loading.set(false);
    }
  }

  agregar() {
    this.router.navigate([
      '/proceso',
      this.idProceso,
      'etapas',
      'nuevo'
    ]);
  }

  async eliminar(id: number) {
    if (!confirm('¿Quitar esta etapa del flujo?')) return;

    await firstValueFrom(this.service.eliminar(id));
    await this.cargar();
  }

  // 🔜 aquí luego conectamos drag & drop
  async reordenar(ids: number[]) {
    await firstValueFrom(
      this.service.reordenar(this.idProceso, ids)
    );
    await this.cargar();
  }

  async drop(event: CdkDragDrop<ProcesoEtapaDTO[]>) {

    const lista = [...this.etapas()];

    moveItemInArray(
      lista,
      event.previousIndex,
      event.currentIndex
    );

    this.etapas.set(lista);

    const idsOrdenados = lista.map(e => e.iId);

    await this.reordenar(idsOrdenados);
  }

}
