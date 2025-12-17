import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ProcesoListService } from '../proceso-list.service';
import { ProcesoDTO } from '../../../../compartidos/DTOs/proceso/ProcesoDTO';

@Component({
  selector: 'app-proceso-list',
  imports: [],
  templateUrl: './proceso-list.html',
  styleUrl: './proceso-list.css',
})
export class ProcesoList {

  private readonly service = inject(ProcesoListService);
  private readonly router = inject(Router);

  // state
  readonly loading = signal(true);
  readonly tipos = signal<ProcesoDTO[]>([]);

  constructor() {
    this.cargar();
  }

  async cargar() {
    this.loading.set(true);
    try {
      const data = await firstValueFrom(this.service.listar());
      this.tipos.set(data);
    } finally {
      this.loading.set(false);
    }
  }

  nuevo() {
    this.router.navigate(['/proceso/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/proceso', id]);
  }

  irSecciones(id: number) {
    this.router.navigate(['/secciones', id]);
  }

  async eliminar(id: number) {
    if (!confirm('¿Eliminar este tipo de proceso?')) return;

    await firstValueFrom(this.service.eliminar(id));
    await this.cargar();
  }

  irEtapas(idProceso: number) {
    this.router.navigate([
      '/proceso',
      idProceso,
      'etapas'
    ]);
  }
}
