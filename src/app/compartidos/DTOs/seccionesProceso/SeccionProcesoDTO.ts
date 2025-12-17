export interface SeccionProcesoDTO {
  iId: number;
  iIdProceso: number;
  cTitulo: string;
  cDescripcion: string | null;
  iOrden: number;
  lActivo: boolean;
  dtCreado?: string;
}
