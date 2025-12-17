export interface CatCampoUpdateDTO {
  cEtiquetaDefault: string;
  cTipoDato: string;

  iLongitudMax?: number;
  cRegexValidacion?: string;
  cMimePermitidos?: string;
  iPesoMaxKB?: number;

  lActivo: boolean;
}
