import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '@environments/environment';

/**
 * Servicio base para todas las peticiones HTTP
 * Centraliza la lógica común de CRUD y manejo de errores
 */
@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {
  protected apiUrl = environment.apiUrl;

  constructor(protected http: HttpClient) {}

  /**
   * GET - Obtiene todos los registros
   */
  protected get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`, { params })
      .pipe(
        catchError(error => this.manejarError(error))
      );
  }

  /**
   * GET - Obtiene un registro por ID
   */
  protected getById<T>(endpoint: string, id: string | number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}/${id}`)
      .pipe(
        catchError(error => this.manejarError(error))
      );
  }

  /**
   * POST - Crea un nuevo registro
   */
  protected post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, data)
      .pipe(
        catchError(error => this.manejarError(error))
      );
  }

  /**
   * PUT - Actualiza un registro existente
   */
  protected put<T>(endpoint: string, id: string | number, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}/${id}`, data)
      .pipe(
        catchError(error => this.manejarError(error))
      );
  }

  /**
   * PATCH - Actualización parcial
   */
  protected patch<T>(endpoint: string, id: string | number, data: any): Observable<T> {
    return this.http.patch<T>(`${this.apiUrl}${endpoint}/${id}`, data)
      .pipe(
        catchError(error => this.manejarError(error))
      );
  }

  /**
   * DELETE - Elimina un registro
   */
  protected delete<T>(endpoint: string, id: string | number): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}/${id}`)
      .pipe(
        catchError(error => this.manejarError(error))
      );
  }

  /**
   * DELETE - Elimina múltiples registros
   */
  protected deleteMultiple<T>(endpoint: string, ids: (string | number)[]): Observable<T> {
    const params = new HttpParams()
      .set('ids', ids.join(','));

    return this.http.delete<T>(`${this.apiUrl}${endpoint}`, { params })
      .pipe(
        catchError(error => this.manejarError(error))
      );
  }

  /**
   * Descarga un archivo
   */
  protected descargarArchivo(endpoint: string, filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}${endpoint}`, { responseType: 'blob' })
      .pipe(
        catchError(error => this.manejarError(error))
      );
  }

  /**
   * Sube un archivo
   */
  protected subirArchivo<T>(endpoint: string, archivo: File): Observable<T> {
    const formData = new FormData();
    formData.append('archivo', archivo);

    return this.http.post<T>(`${this.apiUrl}${endpoint}`, formData)
      .pipe(
        catchError(error => this.manejarError(error))
      );
  }

  /**
   * Maneja errores HTTP de forma centralizada
   */
  protected manejarError(error: HttpErrorResponse): Observable<never> {
    let mensajeError = 'Ocurrió un error en la solicitud';

    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      mensajeError = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      mensajeError = error.error?.message || error.error?.error || mensajeError;
    }

    console.error('Error HTTP:', {
      status: error.status,
      message: mensajeError,
      url: error.url
    });

    return throwError(() => ({
      status: error.status,
      message: mensajeError,
      error: error.error
    }));
  }
}
