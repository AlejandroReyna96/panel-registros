export interface ProcesoDTO {
  iId: number;
  cNombre: string;
  cDescripcion?: string | null;
  lActivo: boolean;
  dtCreado: string; // DateTime (ISO)
}
