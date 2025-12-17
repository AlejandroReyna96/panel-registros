import { CampoProcesoDTO } from "./CampoProcesoDTO";

export interface SeccionProcesoCompletaDTO {
  iId: number;
  cTitulo: string;
  cDescripcion?: string | null;
  iOrden: number;

  Campos: CampoProcesoDTO[];
}