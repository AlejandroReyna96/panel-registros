import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SeccionesListService } from '../secciones-list.service';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { SeccionProcesoDTO } from '../../../../compartidos/DTOs/seccionesProceso/SeccionProcesoDTO';

@Component({
  selector: 'app-secciones-list',
  imports: [CommonModule, DragDropModule],
  templateUrl: './secciones-list.html',
  styleUrl: './secciones-list.css',
})
export class SeccionesList {

  private readonly service = inject(SeccionesListService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly secciones = signal<SeccionProcesoDTO[]>([]);

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
        this.service.listar(this.idProceso)
      );
      this.secciones.set(data);
    } finally {
      this.loading.set(false);
    }
  }

  async drop(event: CdkDragDrop<SeccionProcesoDTO[]>) {

    const lista = [...this.secciones()];

    moveItemInArray(lista, event.previousIndex, event.currentIndex);
    this.secciones.set(lista);

    const idsOrdenados = lista.map(s => s.iId);

    try {
      await firstValueFrom(
        this.service.reordenar(this.idProceso, idsOrdenados)
      );
    } catch {
      // 🔴 Si falla, recarga desde backend
      await this.cargar();
    }
  }


  nuevo() {
    this.router.navigate(['/secciones', this.idProceso, 'crear']);
  }

  editar(id: number) {
    this.router.navigate(['/secciones', this.idProceso, 'editar', id]);
  }

  irCampos(idSeccion: number) {
    this.router.navigate(['/campos', idSeccion]);
  }

  async eliminar(id: number) {
    if (!confirm('¿Eliminar esta sección?')) return;

    await firstValueFrom(this.service.eliminar(id));
    await this.cargar();
  }
}
