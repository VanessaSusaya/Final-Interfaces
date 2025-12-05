import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard para proteger la ruta de login
 * Previene que usuarios autenticados accedan a /login
 * Los redirige automáticamente a /dashboard
 */
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Si ya está autenticado, redirige a dashboard
    if (this.authService.estaAutenticado()) {
      this.router.navigate(['/dashboard']);
      return false;
    }

    // Permite acceso a login si no está autenticado
    return true;
  }
}
