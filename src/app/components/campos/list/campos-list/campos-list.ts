import { Component, inject, signal } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { CamposListService } from '../campos-list.service';
import { CommonModule } from '@angular/common';
import { CampoProcesoDTO } from '../../../../compartidos/DTOs/proceso/CampoProcesoDTO';

@Component({
  selector: 'app-campos-list',
  imports: [CommonModule, DragDropModule],
  templateUrl: './campos-list.html',
  styleUrl: './campos-list.css',
})
export class CamposList {

  private readonly service = inject(CamposListService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly loading = signal(true);
  readonly campos = signal<CampoProcesoDTO[]>([]);

  readonly idSeccion = Number(
    this.route.snapshot.paramMap.get('idSeccion')
  );

  constructor() {
    this.cargar();
  }

  async cargar() {
    this.loading.set(true);
    try {
      const data = await firstValueFrom(
        this.service.listarPorSeccion(this.idSeccion)
      );
      this.campos.set(data);
    } finally {
      this.loading.set(false);
    }
  }

  async drop(event: CdkDragDrop<CampoProcesoDTO[]>) {
    const lista = [...this.campos()];
    moveItemInArray(lista, event.previousIndex, event.currentIndex);
    this.campos.set(lista);

    const idsOrdenados = lista.map(c => c.iId);

    await firstValueFrom(
      this.service.reordenar(this.idSeccion, idsOrdenados)
    );
  }

  nuevo() {
    this.router.navigate(['/campos', this.idSeccion, 'nuevo']);
  }

  editar(idCampo: number) {
    this.router.navigate(['/campos', this.idSeccion, idCampo]);
  }

  async eliminar(idCampo: number) {
    if (!confirm('¿Eliminar este campo de la sección?')) return;

    await firstValueFrom(this.service.eliminar(idCampo));
    await this.cargar();
  }

  getTipoVisual(c: CampoProcesoDTO): string {
    if (c.cTipoDato === 'file') return 'Archivo';
    if (c.cTipoDato === 'text') return 'Texto';
    if (c.cTipoDato === 'number') return 'Número';
    if (c.cTipoDato === 'select') return 'Selección';
    return c.cTipoDato;
  }

  getRestricciones(c: CampoProcesoDTO): string[] {
    const r: string[] = [];

    if (c.iLongitudMax) r.push(`Máx ${c.iLongitudMax} caracteres`);
    if (c.iPesoMaxKB) r.push(`Máx ${c.iPesoMaxKB} KB`);
    if (c.cMimePermitidos) r.push(`Formatos: ${c.cMimePermitidos}`);
    if (c.cRegexValidacion) r.push(`Validación especial`);

    return r;
  }
}
