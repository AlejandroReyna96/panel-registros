import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProcesoFormService } from '../proceso-form.service';
import { ProcesoCreateDTO } from '../../../../compartidos/DTOs/proceso/ProcesoCreateDTO';

@Component({
  selector: 'app-proceso-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './proceso-form.html',
  styleUrl: './proceso-form.css',
})
export class ProcesoForm {
  private readonly service = inject(ProcesoFormService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly isEdit = signal(false);

  readonly model = signal<ProcesoCreateDTO>({
    cNombre: '',
    cDescripcion: ''
  });

  private id?: number;

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.isEdit.set(true);
      this.cargar();
    }
  }

  async cargar() {
    if (!this.id) return;

    this.loading.set(true);
    try {
      const data = await firstValueFrom(this.service.obtener(this.id));
      this.model.set({
        cNombre: data.cNombre,
        cDescripcion: data.cDescripcion ?? '',
      });
    } finally {
      this.loading.set(false);
    }
  }

  async guardar() {
    this.loading.set(true);
    try {
      if (this.isEdit() && this.id) {
        await firstValueFrom(this.service.actualizar(this.id, this.model()));
      } else {
        await firstValueFrom(this.service.crear(this.model()));
      }
      this.router.navigate(['/proceso']);
    } finally {
      this.loading.set(false);
    }
  }

  cancelar() {
    this.router.navigate(['/proceso']);
  }
}
