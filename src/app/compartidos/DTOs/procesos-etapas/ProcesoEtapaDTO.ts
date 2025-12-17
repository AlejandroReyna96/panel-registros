export interface ProcesoEtapaDTO {
  iId: number;
  iIdProceso: number;
  iIdEtapa: number;

  cNombreEtapa: string;

  iOrden: number;
  lEsInicial: boolean;
  lEsFinal: boolean;
  lActivo: boolean;
}