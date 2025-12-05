import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Guard para proteger rutas según el rol del usuario
 * Verifica si el usuario tiene el rol requerido especificado en route.data.roles
 * Implementa CanActivate y CanActivateChild para protección en múltiples niveles
 */
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Valida el acceso a rutas principales según rol
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.verificarRol(route, state.url);
  }

  /**
   * Valida el acceso a rutas anidadas según rol
   */
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.verificarRol(route, state.url);
  }

  /**
   * Método privado para centralizar la lógica de verificación de roles
   */
  private verificarRol(route: ActivatedRouteSnapshot, url: string): boolean {
    const rolesRequeridos = route.data['roles'] as string[] | undefined;

    // Si no hay roles especificados, permite acceso
    if (!rolesRequeridos || rolesRequeridos.length === 0) {
      return true;
    }

    const rolActual = this.authService.obtenerRolActual();

    // Valida que el usuario tenga uno de los roles requeridos
    if (rolActual && rolesRequeridos.includes(rolActual)) {
      console.log(`Acceso permitido: usuario con rol '${rolActual}'`);
      return true;
    }

    // Acceso denegado
    console.warn(`Acceso denegado: rol actual '${rolActual}' no incluido en roles requeridos: [${rolesRequeridos.join(', ')}]`);
    
    // Redirige a dashboard si no tiene el rol requerido
    this.router.navigate(['/dashboard'], {
      queryParams: { returnUrl: url }
    });

    return false;
  }
}
