import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ObjetosListService } from '../objetos-list.service';
import { CatCampoDTO } from '../../../../compartidos/DTOs/cat-campos/CatCampoDTO';

@Component({
  selector: 'app-objetos-list',
  imports: [CommonModule],
  templateUrl: './objetos-list.html',
  styleUrl: './objetos-list.css',
})
export class ObjetosList {

  private readonly service = inject(ObjetosListService);
  private readonly router = inject(Router);

  // ===============================
  // STATE
  // ===============================
  readonly loading = signal(true);
  readonly objetos = signal<CatCampoDTO[]>([]);

  constructor() {
    this.cargar();
  }

  // ===============================
  // DATA
  // ===============================
  async cargar() {
    this.loading.set(true);
    try {
      const data = await firstValueFrom(this.service.listar());
      this.objetos.set(data);
    } finally {
      this.loading.set(false);
    }
  }

  // ===============================
  // NAVIGATION
  // ===============================
  nuevo() {
    this.router.navigate(['/objetos/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/objetos', id]);
  }

  // ===============================
  // ACTIONS
  // ===============================
  async eliminar(id: number) {
    if (!confirm('¿Eliminar este objeto del catálogo?')) return;

    await firstValueFrom(this.service.eliminar(id));
    await this.cargar();
  }
}
