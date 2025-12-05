import { Routes } from '@angular/router';
import { AuthGuard, RoleGuard, LoginGuard } from '@core/guards';

/**
 * Rutas principales de la aplicación
 * - Rutas públicas: /login
 * - Rutas protegidas: /dashboard, /usuarios, /cursos, /reportes
 * - Manejo de rutas inexistentes: wildcard (.*) redirige a /dashboard
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },
  {
    path: 'usuarios',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
    loadChildren: () => import('./features/usuarios/usuarios.routes').then(m => m.USUARIOS_ROUTES)
  },
  {
    path: 'cursos',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./features/cursos/cursos.routes').then(m => m.CURSOS_ROUTES)
  },
  {
    path: 'reportes',
    canActivate: [AuthGuard, RoleGuard],
    canActivateChild: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'profesor'] },
    loadChildren: () => import('./features/reportes/reportes.routes').then(m => m.REPORTES_ROUTES)
  },
  {
    path: 'acceso-denegado',
    loadChildren: () => import('./features/error/error.routes').then(m => m.ERROR_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];
