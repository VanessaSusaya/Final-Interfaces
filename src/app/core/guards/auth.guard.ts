import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard para proteger rutas que requieren autenticación
 * Verifica si el usuario tiene un token válido y no expirado
 * Implementa CanActivate y CanActivateChild para protección en múltiples niveles
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Valida el acceso a rutas principales
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.verificarAutenticacion(state.url);
  }

  /**
   * Valida el acceso a rutas anidadas
   */
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.verificarAutenticacion(state.url);
  }

  /**
   * Método privado para centralizar la lógica de verificación
   */
  private verificarAutenticacion(url: string): boolean {
    if (this.authService.estaAutenticado()) {
      // Token válido, permite acceso
      return true;
    }

    // Token inválido o expirado
    console.warn('Acceso denegado: Usuario no autenticado');
    this.authService.logout();
    
    // Redirige a login guardando la URL para retorno posterior
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: url } 
    });
    
    return false;
  }
}
