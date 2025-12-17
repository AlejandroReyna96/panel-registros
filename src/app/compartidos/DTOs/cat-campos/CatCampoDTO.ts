export interface CatCampoDTO {
  iId: number;

  cNombreCampo: string;        // CURP, RFC, correo, etc.
  cEtiquetaDefault: string;    // Etiqueta sugerida
  cTipoDato: string;           // text, number, file, select, date, etc.

  iLongitudMax?: number;
  cRegexValidacion?: string;
  cMimePermitidos?: string;
  iPesoMaxKB?: number;

  lActivo: boolean;
  dtCreado?: string; // DateTime
}
