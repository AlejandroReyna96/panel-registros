export interface CampoProcesoCreateDTO {
  iIdSeccionProceso: number;
  iIdCatCampo: number;

  cEtiquetaOverride?: string;
  lRequerido: boolean;
  cOpcionesCatalogo?: string;

  iOrden?: number;
}
