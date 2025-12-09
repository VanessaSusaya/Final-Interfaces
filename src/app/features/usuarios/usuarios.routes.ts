import { Routes } from '@angular/router';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { DetalleUsuarioComponent } from './pages/detalle-usuario/detalle-usuario.component';

export const USUARIOS_ROUTES: Routes = [
  {
    path: '',
    component: ListaUsuariosComponent
  },
  {
    path: '.id',
    component: DetalleUsuarioComponent
  },
  {
    path: ':id',
    component: DetalleUsuarioComponent
  }
];
