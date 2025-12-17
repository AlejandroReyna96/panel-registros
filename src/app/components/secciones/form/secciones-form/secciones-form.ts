import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SeccionesFormService } from '../secciones-form.service';
import { SeccionProcesoCreateDTO } from '../../../../compartidos/DTOs/seccionesProceso/SeccionProcesoCreateDTO';

@Component({
  selector: 'app-secciones-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './secciones-form.html',
  styleUrl: './secciones-form.css',
})
export class SeccionesForm {

  private readonly service = inject(SeccionesFormService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly isEdit = signal(false);

  readonly iIdProceso = Number(
    this.route.snapshot.paramMap.get('idProceso')
  );

  private idSeccion?: number;

  readonly model = signal<SeccionProcesoCreateDTO>({
    iIdProceso: this.iIdProceso,
    cTitulo: '',
    cDescripcion: '',
  });

  constructor() {
    const idParam = this.route.snapshot.paramMap.get('idSeccion');

    if (idParam) {
      this.idSeccion = Number(idParam);
      this.isEdit.set(true);
      this.cargar();
    }
  }

  async cargar() {
    if (!this.idSeccion) return;

    this.loading.set(true);
    try {
      const data = await firstValueFrom(
        this.service.obtener(this.idSeccion)
      );

      this.model.set({
        iIdProceso: data.iIdProceso,
        cTitulo: data.cTitulo,
        cDescripcion: data.cDescripcion ?? '',
      });
    } finally {
      this.loading.set(false);
    }
  }

  async guardar() {
    this.loading.set(true);
    try {
      if (this.isEdit() && this.idSeccion) {
        await firstValueFrom(
          this.service.actualizar(this.idSeccion, this.model())
        );
      } else {
        await firstValueFrom(
          this.service.crear(this.model())
        );
      }

      this.router.navigate(['/secciones', this.iIdProceso]);
    } finally {
      this.loading.set(false);
    }
  }

  cancelar() {
    this.router.navigate(['/secciones', this.iIdProceso]);
  }
}
