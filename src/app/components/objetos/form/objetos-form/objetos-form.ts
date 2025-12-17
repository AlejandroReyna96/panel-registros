import { Component, computed, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ObjetosFormService } from '../objetos-form.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-objetos-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './objetos-form.html',
  styleUrl: './objetos-form.css',
})
export class ObjetosForm {

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(ObjetosFormService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly esEdicion = computed(() => !!this.id);

  readonly loading = signal(false);

  // ===============================
  // FORM
  // ===============================
  readonly form = this.fb.group({
    cNombreCampo: ['', Validators.required],
    cEtiquetaDefault: ['', Validators.required],
    cTipoDato: ['', Validators.required],

    iLongitudMax: [null as number | null],
    cRegexValidacion: [''],
    cMimePermitidos: [''],
    iPesoMaxKB: [null as number | null],
  });

  constructor() {
    if (this.esEdicion()) {
      this.cargar();
    }
  }

  // ===============================
  // DATA
  // ===============================
  async cargar() {
    this.loading.set(true);
    try {
      const data = await firstValueFrom(this.service.obtener(this.id));
      this.form.patchValue(data);
    } finally {
      this.loading.set(false);
    }
  }

  // ===============================
  // ACTIONS
  // ===============================
  async guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    try {
      const raw = this.form.getRawValue();

      // 🔹 NORMALIZACIÓN null → undefined
      const dto = {
        ...raw,
        iLongitudMax: raw.iLongitudMax ?? undefined,
        iPesoMaxKB: raw.iPesoMaxKB ?? undefined,
        cRegexValidacion: raw.cRegexValidacion || undefined,
        cMimePermitidos: raw.cMimePermitidos || undefined,
      };

      if (this.esEdicion()) {
        await firstValueFrom(this.service.actualizar(this.id, dto));
      } else {
        await firstValueFrom(this.service.crear(dto));
      }

      this.router.navigate(['/objetos']);
    } finally {
      this.loading.set(false);
    }
  }

  cancelar() {
    this.router.navigate(['/objetos']);
  }
}
