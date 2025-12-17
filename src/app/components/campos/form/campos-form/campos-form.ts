import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CamposFormService } from '../campos-form.service';
import { CatCampoDTO } from '../../../../compartidos/DTOs/cat-campos/CatCampoDTO';

@Component({
  selector: 'app-campos-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './campos-form.html',
  styleUrl: './campos-form.css',
})
export class CamposForm {

  private readonly fb = inject(NonNullableFormBuilder);
  private readonly service = inject(CamposFormService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // ===============================
  // STATE
  // ===============================
  readonly loading = signal(true);
  readonly objetos = signal<CatCampoDTO[]>([]);
  readonly objetoSeleccionado = signal<CatCampoDTO | null>(null);

  readonly idSeccion = Number(this.route.snapshot.paramMap.get('idSeccion'));
  readonly idCampo = Number(this.route.snapshot.paramMap.get('idCampo'));
  readonly esEdicion = () => this.idCampo > 0;

  // ===============================
  // FORM
  // ===============================
  readonly form = this.fb.group({
    iIdCatCampo: [0, Validators.required],
    cEtiquetaOverride: [''],
    lRequerido: [false],
    cOpcionesCatalogo: [''],
    iOrden: [1],
  });

  constructor() {
    this.cargar();
  }

  // ===============================
  // LOAD
  // ===============================
  async cargar() {
    this.loading.set(true);

    try {
      // 1. Cargar catálogo de objetos
      const objetos = await firstValueFrom(
        this.service.listarObjetos()
      );
      this.objetos.set(objetos);

      // 2. Detectar cambio de objeto
      this.form.get('iIdCatCampo')!.valueChanges.subscribe(id => {
        const obj = this.objetos().find(o => o.iId === id) || null;
        this.objetoSeleccionado.set(obj);

        // Si no es select, limpia opciones
        if (obj && obj.cTipoDato !== 'select') {
          this.form.patchValue(
            { cOpcionesCatalogo: '' },
            { emitEvent: false }
          );
        }
      });

      // 3. Si es edición, cargar campo
      if (this.esEdicion()) {
        const campo = await firstValueFrom(
          this.service.obtener(this.idCampo)
        );

        this.form.patchValue({
          iIdCatCampo: campo.iIdCatCampo,
          cEtiquetaOverride: campo.cEtiqueta,
          lRequerido: campo.lRequerido,
          cOpcionesCatalogo: campo.cOpcionesCatalogo ?? '',
          iOrden: campo.iOrden,
        });

        this.objetoSeleccionado.set(
          objetos.find(o => o.iId === campo.iIdCatCampo) || null
        );
      }

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
      const raw = this.form.getRawValue();

      const dto = {
        iIdSeccionProceso: this.idSeccion,
        iIdCatCampo: raw.iIdCatCampo,
        cEtiquetaOverride: raw.cEtiquetaOverride || undefined,
        lRequerido: raw.lRequerido,
        cOpcionesCatalogo: raw.cOpcionesCatalogo || undefined,
        iOrden: raw.iOrden,
      };

      if (this.esEdicion()) {
        await firstValueFrom(
          this.service.actualizar(this.idCampo, dto)
        );
      } else {
        await firstValueFrom(
          this.service.crear(dto)
        );
      }

      this.router.navigate(['/campos', this.idSeccion]);

    } finally {
      this.loading.set(false);
    }
  }

  cancelar() {
    this.router.navigate(['/campos', this.idSeccion]);
  }
}
