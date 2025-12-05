import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { DestalleUsuarioComponent } from './pages/detalle-usuario/detalle-usuario.component';

export const USUARIOS_ROUTES: Routes = [
  {
    path: '',
    component: ListaUsuariosComponent
  },
  {
    path: 'nuevo',
    component: DestalleUsuarioComponent
  },
  {
    path: ':id',
    component: DestalleUsuarioComponent
  }
];
