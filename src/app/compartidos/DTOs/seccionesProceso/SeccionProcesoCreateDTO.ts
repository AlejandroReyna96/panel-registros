export interface SeccionProcesoCreateDTO {
  iIdProceso: number;

  cTitulo: string;
  cDescripcion?: string;

  // ⚠️ solo se usa si decides permitir override manual
  iOrden?: number;
}