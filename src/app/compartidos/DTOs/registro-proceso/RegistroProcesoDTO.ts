export interface RegistroProcesoDTO {
  iId: number;
  iIdProceso: number;

  cFolio?: string;
  cRegistradoPor?: string;

  dtRegistro?: string; // ISO Date
  lActivo: boolean;

  // 🔹 Derivados
  cEtapaActual?: string;

  // 🔹 JSON crudo (form dinámico)
  cValoresJSON?: string;
}
