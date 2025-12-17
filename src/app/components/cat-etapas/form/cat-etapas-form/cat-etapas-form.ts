import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CatEtapasFormService } from '../CatEtapas-form.service';


@Component({
  selector: 'app-cat-etapas-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cat-etapas-form.html',
  styleUrls: ['./cat-etapas-form.css'],
})
export class CatEtapasForm {

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(CatEtapasFormService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // ===============================
  // STATE
  // ===============================
  readonly loading = signal(false);

  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly esEdicion = () => this.id > 0;

  // ===============================
  // FORM
  // ===============================
  readonly form = this.fb.group({
    cNombre: ['', Validators.required],
    cDescripcion: [''],
  });

  constructor() {
    if (this.esEdicion()) {
      this.cargar();
    }
  }

  // ===============================
  // LOAD
  // ===============================
  async cargar() {
    this.loading.set(true);
    try {
      const estado = await firstValueFrom(
        this.service.obtener(this.id)
      );

      this.form.patchValue({
        cNombre: estado.cNombre,
        cDescripcion: estado.cDescripcion ?? '',
      });
    } finally {
      this.loading.set(false);
    }
  }

  // ===============================
  // SAVE
  // ===============================
  async guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    try {
      const dto = this.form.getRawValue();

      if (this.esEdicion()) {
        await firstValueFrom(
          this.service.actualizar(this.id, dto)
        );
      } else {
        await firstValueFrom(
          this.service.crear(dto)
        );
      }

      this.router.navigate(['/cat-etapas']);
    } finally {
      this.loading.set(false);
    }
  }

  cancelar() {
    this.router.navigate(['/cat-etapas']);
  }
}
