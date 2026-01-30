import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CamposFormService } from '../campos-form.service';
import { CatCampoDTO } from '../../../../compartidos/DTOs/cat-campos/CatCampoDTO';
import { DataSourceDTO } from '../../../../compartidos/DTOs/DataSources/DataSourceDTO';
import { CampoProcesoDTO } from '../../../../compartidos/DTOs/proceso/CampoProcesoDTO';
import { CampoProcesoReglaDTO } from '../../../../compartidos/DTOs/reglas/CampoProcesoReglaDTO';

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
  readonly dataSources = signal<DataSourceDTO[]>([]);

  // ===============================
  // VISIBILIDAD
  // ===============================
  readonly camposProceso = signal<CampoProcesoDTO[]>([]);
  readonly reglasVisibilidad = signal<CampoProcesoReglaDTO[]>([]);

  readonly reglaDraft = signal({
    iIdCampoControlador: 0,
    cOperador: 'in',
    valores: [] as string[]
  });

  readonly idProceso = signal<number>(0);

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
    cDataSourceClave: [''],
    iOrden: [1],
  });

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      this.idProceso.set(
        Number(params.get('idProceso')) || 0
      );
    });


    this.form.get('iIdCatCampo')!.valueChanges.subscribe(value => {
      this.actualizarObjetoSeleccionado(Number(value));
    });

    this.cargar();
  }


  // ===============================
  // LOAD
  // ===============================
  async cargar() {
    debugger;
    this.loading.set(true);

    try {
      // Limpieza defensiva
      this.reglasVisibilidad.set([]);
      this.camposProceso.set([]);

      // ===============================
      // 1. Catálogo de objetos (Cat_Campos)
      // ===============================
      const objetos = await firstValueFrom(this.service.listarObjetos());
      this.objetos.set(objetos);

      // this.form.get('iIdCatCampo')!.valueChanges.subscribe(value => {
      //   this.actualizarObjetoSeleccionado(Number(value));
      // });

      // ===============================
      // 2. DataSources
      // ===============================
      const dataSources = await firstValueFrom(this.service.listarDataSources());
      this.dataSources.set(dataSources);

      // ===============================
      // 3. Campos del proceso (para reglas)
      // ===============================
      if (this.idProceso() > 0) {
        const campos = await firstValueFrom(
          this.service.listarCamposProceso(this.idProceso())
        );

        // Excluir el campo actual (no puede depender de sí mismo)
        this.camposProceso.set(
          campos.filter(c => c.iId !== this.idCampo)
        );
      }

      // ===============================
      // 4. Si es edición, cargar campo + reglas
      // ===============================
      if (this.esEdicion()) {
        debugger;
        const campo = await firstValueFrom(this.service.obtener(this.idCampo));

        this.form.patchValue({
          iIdCatCampo: campo.iIdCatCampo,
          cEtiquetaOverride: campo.cEtiqueta,
          lRequerido: campo.lRequerido,
          cDataSourceClave: campo.cDataSourceClave ?? '',
          iOrden: campo.iOrden,
        });

        this.actualizarObjetoSeleccionado(campo.iIdCatCampo);

        // Reglas de visibilidad
        const reglas = await firstValueFrom(this.service.listarReglasCampo(this.idCampo));
        this.reglasVisibilidad.set(reglas);
      }

    } finally {
      this.loading.set(false);
    }
  }


  requiereDataSource(tipo?: string): boolean {
    return ['select', 'radio', 'checkbox'].includes(tipo ?? '');
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
        cDataSourceClave: raw.cDataSourceClave || undefined,
        iOrden: raw.iOrden,
      };

      if (this.esEdicion()) {
        await firstValueFrom(this.service.actualizar(this.idCampo, dto));
      } else {
        await firstValueFrom(this.service.crear(dto));
      }

      this.router.navigate(['/campos', this.idSeccion]);

    } finally {
      this.loading.set(false);
    }
  }

  cancelar() {
    this.router.navigate(['/campos', this.idSeccion]);
  }

  private actualizarObjetoSeleccionado(idCatCampo: number) {
    const obj = this.objetos().find(o => o.iId === idCatCampo) || null;
    this.objetoSeleccionado.set(obj);

    if (!this.requiereDataSource(obj?.cTipoDato)) {
      this.form.patchValue({ cDataSourceClave: '' }, { emitEvent: false });
    }
  }

  async agregarRegla() {
    const r = this.reglaDraft();

    if (!r.iIdCampoControlador || r.valores.length === 0) {
      return;
    }

    await firstValueFrom(
      this.service.crearRegla({
        iIdCampoProceso: this.idCampo,
        iIdCampoControlador: r.iIdCampoControlador,
        cOperador: r.cOperador,
        valores: r.valores
      })
    );

    // recargar reglas
    const reglas = await firstValueFrom(this.service.listarReglasCampo(this.idCampo));
    this.reglasVisibilidad.set(reglas);

    // limpiar draft
    this.reglaDraft.set({
      iIdCampoControlador: 0,
      cOperador: 'in',
      valores: []
    });
  }

  async eliminarRegla(id: number) {
    await firstValueFrom(this.service.eliminarRegla(id));

    this.reglasVisibilidad.set(
      this.reglasVisibilidad().filter(r => r.iId !== id)
    );
  }

  getEtiquetaCampo(idCampo: number): string {
    return (
      this.camposProceso()
        .find(c => c.iId === idCampo)
        ?.cEtiqueta ?? 'Campo desconocido'
    );
  }

  onValoresChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;

    const valores = value
      .split(',')
      .map(v => v.trim())
      .filter(v => v.length > 0);

    this.reglaDraft.update(r => ({
      ...r,
      valores
    }));
  }

  onOperadorChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;

    this.reglaDraft.update(r => ({
      ...r,
      cOperador: value
    }));
  }

  onCampoControladorChange(event: Event) {
    const value = Number(
      (event.target as HTMLSelectElement).value
    );

    this.reglaDraft.update(r => ({
      ...r,
      iIdCampoControlador: value
    }));
  }




}
