export interface CatCampoCreateDTO {
  cNombreCampo: string;
  cEtiquetaDefault: string;
  cTipoDato: string;

  iLongitudMax?: number;
  cRegexValidacion?: string;
  cMimePermitidos?: string;
  iPesoMaxKB?: number;
}
