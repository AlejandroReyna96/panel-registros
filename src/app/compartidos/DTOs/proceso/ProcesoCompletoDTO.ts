import { SeccionProcesoCompletaDTO } from "./SeccionProcesoCompletaDTO";

export interface ProcesoCompletoDTO {
  iId: number;
  cNombre: string;
  cDescripcion?: string | null;
  cCreadoPor?: string | null;
  dtCreado: string; // DateTime (ISO)

  Secciones: SeccionProcesoCompletaDTO[];
}