export interface CampoProcesoCreateDTO {
  iIdSeccionProceso: number;
  iIdCatCampo: number;

  cEtiquetaOverride?: string;
  lRequerido: boolean;
  cDataSourceClave?: string;

  iOrden?: number;
}
