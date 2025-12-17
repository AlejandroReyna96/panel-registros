export interface CampoProcesoDTO {
  iId: number;
  iIdSeccionProceso: number;
  iIdCatCampo: number;
  cNombreCampo: string;
  cEtiqueta: string;
  cTipoDato: string;
  iLongitudMax?: number;
  cRegexValidacion?: string;
  cMimePermitidos?: string;
  iPesoMaxKB?: number;
  lRequerido: boolean;
  cOpcionesCatalogo?: string;
  iOrden: number;
  lActivo: boolean;
  dtCreado?: string;
}
