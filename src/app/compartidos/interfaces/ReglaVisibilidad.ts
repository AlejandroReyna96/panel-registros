interface ReglaVisibilidad {
  campoControladorId: number; // iIdCampoProceso
  operador: 'EQUALS' | 'IN' | 'NOT_IN';
  valores: string[];
}