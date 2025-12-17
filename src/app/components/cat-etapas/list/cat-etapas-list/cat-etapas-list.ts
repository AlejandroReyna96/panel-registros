import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CatEtapasListService } from '../CatEtapas-list.service';
import { CatEtapaDTO } from '../../../../compartidos/DTOs/cat-etapas/CatEtapaDTO';

@Component({
  selector: 'app-cat-etapas-list',
  imports: [CommonModule],
  templateUrl: './cat-etapas-list.html',
  styleUrls: ['./cat-etapas-list.css'],
})
export class CatEtapasList {

  private readonly service = inject(CatEtapasListService);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly estados = signal<CatEtapaDTO[]>([]);

  constructor() {
    this.cargar();
  }

  // ===============================
  // LOAD
  // ===============================
  async cargar() {
    this.loading.set(true);
    try {
      const data = await firstValueFrom(this.service.listar());
      this.estados.set(data);
    } finally {
      this.loading.set(false);
    }
  }

  // ===============================
  // NAV
  // ===============================
  nuevo() {
    this.router.navigate(['/cat-etapas/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/cat-etapas', id]);
  }

  // ===============================
  // ACTIONS
  // ===============================
  async eliminar(id: number) {
    if (!confirm('¿Eliminar este estado?')) return;

    await firstValueFrom(this.service.eliminar(id));
    await this.cargar();
  }
}
