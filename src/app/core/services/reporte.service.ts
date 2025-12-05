import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of, delay } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reporte } from '../models';
import { BaseHttpService } from './base-http.service';

/**
 * Servicio para gestión de reportes
 * Gestiona generación, descarga y consulta de reportes
 * Hereda de BaseHttpService para manejo centralizado de errores
 */
@Injectable({
  providedIn: 'root'
})
export class ReporteService extends BaseHttpService {
  private readonly endpoint = '/reportes';
  private reportesSubject = new BehaviorSubject<Reporte[]>([]);

  public reportes$ = this.reportesSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Obtiene la lista de reportes disponibles
   */
  obtenerReportes(): Observable<Reporte[]> {
    // Datos mock mientras no haya backend
    const reportesMock: Reporte[] = [
      {
        id: '1',
        tipo: 'usuarios',
        descripcion: 'Reporte de todos los usuarios del sistema',
        fechaGeneracion: new Date(),
        estado: 'completado',
        descargas: 0,
        formato: 'pdf'
      },
      {
        id: '2',
        tipo: 'cursos',
        descripcion: 'Reporte de cursos y estadísticas',
        fechaGeneracion: new Date(),
        estado: 'completado',
        descargas: 0,
        formato: 'excel'
      },
      {
        id: '3',
        tipo: 'inscripciones',
        descripcion: 'Reporte de inscripciones totales',
        fechaGeneracion: new Date(),
        estado: 'completado',
        descargas: 0,
        formato: 'csv'
      }
    ];
    
    return of(reportesMock).pipe(
      delay(300),
      tap((reportes: Reporte[]) => this.reportesSubject.next(reportes))
    );
  }

  /**
   * Obtiene un reporte específico por ID
   */
  obtenerReportePorId(id: string | number): Observable<Reporte> {
    return this.getById<Reporte>(this.endpoint, id);
  }

  /**
   * Genera un reporte de usuarios
   */
  generarReporteUsuarios(): Observable<Reporte> {
    return this.post<Reporte>(`${this.endpoint}/generar`, { tipo: 'usuarios' })
      .pipe(
        tap((reporte: Reporte) => {
          const reportesActuales = this.reportesSubject.value;
          this.reportesSubject.next([...reportesActuales, reporte]);
        })
      );
  }

  /**
   * Genera un reporte de cursos
   */
  generarReporteCursos(): Observable<Reporte> {
    return this.post<Reporte>(`${this.endpoint}/generar`, { tipo: 'cursos' })
      .pipe(
        tap((reporte: Reporte) => {
          const reportesActuales = this.reportesSubject.value;
          this.reportesSubject.next([...reportesActuales, reporte]);
        })
      );
  }

  /**
   * Genera un reporte de inscripciones
   */
  generarReporteInscripciones(): Observable<Reporte> {
    return this.post<Reporte>(`${this.endpoint}/generar`, { tipo: 'inscripciones' })
      .pipe(
        tap((reporte: Reporte) => {
          const reportesActuales = this.reportesSubject.value;
          this.reportesSubject.next([...reportesActuales, reporte]);
        })
      );
  }

  /**
   * Genera un reporte personalizado
   */
  generarReportePersonalizado(tipo: string, filtros?: any): Observable<Reporte> {
    return this.post<Reporte>(`${this.endpoint}/generar`, { tipo, filtros })
      .pipe(
        tap((reporte: Reporte) => {
          const reportesActuales = this.reportesSubject.value;
          this.reportesSubject.next([...reportesActuales, reporte]);
        })
      );
  }

  /**
   * Descarga un reporte en PDF
   */
  descargarReportePDF(id: string | number): Observable<Blob> {
    return this.descargarArchivo(`${this.endpoint}/${id}/descargar`, `reporte_${id}.pdf`);
  }

  /**
   * Descarga un reporte en Excel
   */
  descargarReporteExcel(id: string | number): Observable<Blob> {
    return this.descargarArchivo(`${this.endpoint}/${id}/descargar-excel`, `reporte_${id}.xlsx`);
  }

  /**
   * Descarga un reporte en CSV
   */
  descargarReporteCSV(id: string | number): Observable<Blob> {
    return this.descargarArchivo(`${this.endpoint}/${id}/descargar-csv`, `reporte_${id}.csv`);
  }

  /**
   * Obtiene reportes filtrados
   */
  obtenerReportesFiltrPados(tipo?: string, estado?: string): Observable<Reporte[]> {
    let params = new HttpParams();
    if (tipo) params = params.set('tipo', tipo);
    if (estado) params = params.set('estado', estado);

    return this.get<Reporte[]>(this.endpoint, params);
  }

  /**
   * Obtiene el total de reportes generados
   */
  obtenerTotalReportes(): Observable<{ total: number }> {
    return this.get<{ total: number }>(`${this.endpoint}/stats/total`);
  }

  /**
   * Elimina un reporte
   */
  eliminarReporte(id: string | number): Observable<void> {
    return this.delete<void>(this.endpoint, id)
      .pipe(
        tap(() => {
          const reportesActuales = this.reportesSubject.value;
          const reportesActualizados = reportesActuales.filter((r: Reporte) => r.id !== id);
          this.reportesSubject.next(reportesActualizados);
        })
      );
  }

  /**
   * Obtiene los reportes del BehaviorSubject (síncronamente)
   */
  obtenerReportesActuales(): Reporte[] {
    return this.reportesSubject.value;
  }

  /**
   * Actualiza manualmente el BehaviorSubject
   */
  actualizarListaReportes(reportes: Reporte[]): void {
    this.reportesSubject.next(reportes);
  }
}
