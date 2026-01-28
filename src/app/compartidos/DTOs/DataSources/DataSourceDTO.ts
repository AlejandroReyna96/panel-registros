export interface DataSourceDTO {
  iId: number;
  cClave: string;
  cNombre: string;
  cDescripcion?: string;
  cTipoFuente: 'static' | 'catalogo' | 'api';
  cConfiguracion: string; // JSON en string
}
