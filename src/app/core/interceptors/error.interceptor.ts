import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Interceptor para manejo centralizado de errores HTTP
 * Registra errores y proporciona manejo consistente
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMessage = this.construirMensajeError(error);
        
        // Log centralizado de errores
        this.registrarError(error, errorMessage);

        // Lanza el error para que sea capturado por el componente
        return throwError(() => ({
          status: error.status,
          message: errorMessage,
          error: error.error
        }));
      })
    );
  }

  /**
   * Construye un mensaje de error significativo según el tipo de error
   */
  private construirMensajeError(error: HttpErrorResponse): string {
    let mensaje = 'Ocurrió un error en la solicitud';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      mensaje = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 0:
          mensaje = 'No se puede conectar al servidor. Verifique su conexión a internet.';
          break;
        case 400:
          mensaje = error.error?.message || 'Solicitud inválida (400)';
          break;
        case 401:
          mensaje = 'Sesión expirada. Por favor, inicie sesión nuevamente.';
          break;
        case 403:
          mensaje = 'No tiene permisos para realizar esta acción (403)';
          break;
        case 404:
          mensaje = 'Recurso no encontrado (404)';
          break;
        case 409:
          mensaje = 'Conflicto en la solicitud. El recurso podría existir ya.';
          break;
        case 500:
          mensaje = 'Error interno del servidor. Por favor, intente más tarde.';
          break;
        case 503:
          mensaje = 'Servicio no disponible. El servidor está en mantenimiento.';
          break;
        default:
          mensaje = `Error: ${error.status} - ${error.statusText}`;
      }
    }

    return mensaje;
  }

  /**
   * Registra errores para debugging y monitoreo
   */
  private registrarError(error: HttpErrorResponse, mensaje: string): void {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      status: error.status,
      statusText: error.statusText,
      url: error.url,
      message: mensaje,
      body: error.error
    };

    console.error(`[ERROR ${error.status}]`, logData);

    // Aquí se podría enviar el error a un servicio de logging remoto
    // this.loggingService.reportError(logData);
  }
}
