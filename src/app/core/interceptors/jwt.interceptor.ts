import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, filter, take, switchMap, finalize } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

/**
 * Interceptor JWT para gestionar autenticación global
 * 
 * Responsabilidades:
 * 1. Adjunta el token JWT a todas las peticiones HTTP
 * 2. Maneja errores de autenticación (401)
 * 3. Implementa refresh de token si está disponible
 * 4. Registra peticiones y errores para debugging
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Intercepta todas las peticiones HTTP
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Adjunta el token a la petición
    request = this.adjuntarToken(request);

    return next.handle(request).pipe(
      // Log de peticiones exitosas
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          console.log(`[HTTP ${event.status}] ${request.method} ${request.url}`);
        }
      }),

      // Manejo de errores HTTP
      catchError((error: HttpErrorResponse) => {
        console.error(`[HTTP Error] ${error.status} - ${error.message}`);

        if (error.status === 401) {
          // Error de autenticación
          return this.manejarError401(request, next);
        } else if (error.status === 403) {
          // Error de autorización
          return this.manejarError403();
        } else if (error.status >= 500) {
          // Error del servidor
          return this.manejarErrorServidor(error);
        }

        return throwError(() => error);
      }),

      // Limpia el estado de refresh después de cada petición
      finalize(() => {
        if (this.isRefreshing) {
          this.isRefreshing = false;
        }
      })
    );
  }

  /**
   * Adjunta el token JWT a la petición
   */
  private adjuntarToken(request: HttpRequest<any>): HttpRequest<any> {
    const token = this.authService.obtenerToken();

    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    return request;
  }

  /**
   * Maneja errores 401 (No Autorizado)
   */
  private manejarError401(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      // Intenta refrescar el token
      // Si no hay endpoint de refresh, simplemente logout
      console.warn('Token expirado o inválido. Sesión cerrada.');
      this.authService.logout();
      this.router.navigate(['/login']);

      return throwError(() => new Error('Token expirado'));
    } else {
      // Espera a que se complete el refresh
      return this.refreshTokenSubject.pipe(
        filter(result => result != null),
        take(1),
        switchMap(() => {
          // Reintenta la petición con el nuevo token
          return next.handle(this.adjuntarToken(request));
        })
      );
    }
  }

  /**
   * Maneja errores 403 (Acceso Prohibido)
   */
  private manejarError403(): Observable<never> {
    console.error('Acceso prohibido: No tiene permisos para esta acción.');
    this.router.navigate(['/acceso-denegado']);
    return throwError(() => new Error('Acceso prohibido'));
  }

  /**
   * Maneja errores del servidor (5xx)
   */
  private manejarErrorServidor(error: HttpErrorResponse): Observable<never> {
    console.error(`Error del servidor: ${error.status} - ${error.statusText}`);
    const mensaje = `Error del servidor (${error.status}). Por favor, intente más tarde.`;
    return throwError(() => new Error(mensaje));
  }
}
