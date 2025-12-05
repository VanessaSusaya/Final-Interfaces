import { Routes } from '@angular/router';
import { ListaCursosComponent } from './pages/lista-cursos/lista-cursos.component';
import { DetalleCursoComponent } from './pages/detalle-curso/detalle-curso.component';

export const CURSOS_ROUTES: Routes = [
  {
    path: '',
    component: ListaCursosComponent
  },
  {
    path: 'nuevo',
    component: DetalleCursoComponent
  },
  {
    path: ':id',
    component: DetalleCursoComponent
  }
];
