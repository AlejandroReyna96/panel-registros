import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout/main-layout';


export const routes: Routes = [

    // ====================================================
    // LAYOUT PRINCIPAL
    // ====================================================
    {
        path: '',
        component: MainLayout,
        children: [

            // ----------------------------------------------------
            // PROCESOS
            // ----------------------------------------------------
            {
                path: 'proceso',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./components/procesos/list/proceso-list/proceso-list')
                                .then(m => m.ProcesoList)
                    },
                    {
                        path: 'nuevo',
                        loadComponent: () =>
                            import('./components/procesos/form/proceso-form/proceso-form')
                                .then(m => m.ProcesoForm)
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./components/procesos/form/proceso-form/proceso-form')
                                .then(m => m.ProcesoForm)
                    }
                ]
            },

            // ----------------------------------------------------
            // PROCESOS → ETAPAS (FLUJO)
            // ----------------------------------------------------
            {
                path: 'proceso/:idProceso/etapas',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./components/procesos-etapas/list/procesos-etapas-list/procesos-etapas-list')
                                .then(m => m.ProcesosEtapasList)
                    },
                    {
                        path: 'nuevo',
                        loadComponent: () =>
                            import('./components/procesos-etapas/form/procesos-etapas-form/procesos-etapas-form')
                                .then(m => m.ProcesosEtapasForm)
                    }
                ]
            },

            // ----------------------------------------------------
            // SECCIONES
            // ----------------------------------------------------
            {
                path: 'secciones/:idProceso',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./components/secciones/list/secciones-list/secciones-list')
                                .then(m => m.SeccionesList)
                    },
                    {
                        path: 'crear',
                        loadComponent: () =>
                            import('./components/secciones/form/secciones-form/secciones-form')
                                .then(m => m.SeccionesForm)
                    },
                    {
                        path: 'editar/:idSeccion',
                        loadComponent: () =>
                            import('./components/secciones/form/secciones-form/secciones-form')
                                .then(m => m.SeccionesForm)
                    }
                ]
            },

            // ----------------------------------------------------
            // CAMPOS
            // ----------------------------------------------------
            {
                path: 'campos/:idSeccion',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./components/campos/list/campos-list/campos-list')
                                .then(m => m.CamposList)
                    },
                    {
                        path: 'nuevo',
                        loadComponent: () =>
                            import('./components/campos/form/campos-form/campos-form')
                                .then(m => m.CamposForm)
                    },
                    {
                        path: ':idCampo',
                        loadComponent: () =>
                            import('./components/campos/form/campos-form/campos-form')
                                .then(m => m.CamposForm)
                    }
                ]
            },

            // ----------------------------------------------------
            // REGISTROS
            // ----------------------------------------------------
            {
                path: 'registros',
                children: [
                    {
                        path: 'tipo/:idTipo',
                        loadComponent: () =>
                            import('./components/registros/list/registros-list/registros-list')
                                .then(m => m.RegistrosList)
                    },
                    {
                        path: 'nuevo',
                        loadComponent: () =>
                            import('./components/registros/form/registros-form/registros-form')
                                .then(m => m.RegistrosForm)
                    },
                    {
                        path: 'detalle/:id',
                        loadComponent: () =>
                            import('./components/registros/detalle/registro-detalle/registro-detalle')
                                .then(m => m.RegistroDetalle)
                    }
                ]
            },

            // ----------------------------------------------------
            // Cátalogo de Étapas
            // ----------------------------------------------------
            {
                path: 'cat-etapas',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./components/cat-etapas/list/cat-etapas-list/cat-etapas-list')
                                .then(m => m.CatEtapasList)
                    },
                    {
                        path: 'nuevo',
                        loadComponent: () =>
                            import('./components/cat-etapas/form/cat-etapas-form/cat-etapas-form')
                                .then(m => m.CatEtapasForm)
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./components/cat-etapas/form/cat-etapas-form/cat-etapas-form')
                                .then(m => m.CatEtapasForm)
                    }
                ]
            },

            // ----------------------------------------------------
            // Objetos
            // ----------------------------------------------------
            {
                path: 'objetos',
                children: [
                    {
                        path: '',
                        loadComponent: () =>
                            import('./components/objetos/list/objetos-list/objetos-list')
                                .then(m => m.ObjetosList)
                    },
                    {
                        path: 'nuevo',
                        loadComponent: () =>
                            import('./components/objetos/form/objetos-form/objetos-form')
                                .then(m => m.ObjetosForm)
                    },
                    {
                        path: ':id',
                        loadComponent: () =>
                            import('./components/objetos/form/objetos-form/objetos-form')
                                .then(m => m.ObjetosForm)
                    }
                ]
            }
        ]
    },

    // ====================================================
    // REDIRECCIONES GLOBALES
    // ====================================================
    { path: '', redirectTo: 'tipos-proceso', pathMatch: 'full' },
    { path: '**', redirectTo: 'tipos-proceso' }

];
