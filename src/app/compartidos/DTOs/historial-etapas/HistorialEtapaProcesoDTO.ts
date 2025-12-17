export interface HistorialEtapaProcesoDTO {
  iId: number;

  iIdRegistroProceso: number;
  iIdEtapa: number;

  cNombreEtapa: string;   // derivado (JOIN con Cat_Etapas)
  cUsuario?: string;

  dtCambio?: string;     // ISO Date
}