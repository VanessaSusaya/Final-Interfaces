import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of, delay } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Curso } from '../models';
import { BaseHttpService } from './base-http.service';

/**
 * Servicio para gestión de cursos
 * Implementa todas las operaciones CRUD
 * Maneja inscripciones y retiros de estudiantes
 * Hereda de BaseHttpService para manejo centralizado de errores
 */
@Injectable({
  providedIn: 'root'
})
export class CursoService extends BaseHttpService {
  private readonly endpoint = '/cursos';
  private cursosSubject = new BehaviorSubject<Curso[]>([]);

  public cursos$ = this.cursosSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Obtiene la lista de todos los cursos
   */
  obtenerCursos(): Observable<Curso[]> {
    // Datos mock mientras no haya backend
    const cursosMock: Curso[] = [
      {
        id: '1',
        nombre: 'Angular Avanzado',
        descripcion: 'Aprende Angular con patrones empresariales',
        profesor: '2',
        duracion: 40,
        estudiantes: [],
        estado: true,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      },
      {
        id: '2',
        nombre: 'TypeScript Fundamentals',
        descripcion: 'Domina TypeScript desde cero',
        profesor: '2',
        duracion: 30,
        estudiantes: [],
        estado: true,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      },
      {
        id: '3',
        nombre: 'RxJS Reactive',
        descripcion: 'Programación reactiva con RxJS',
        profesor: '2',
        duracion: 25,
        estudiantes: [],
        estado: true,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      }
    ];
    
    return of(cursosMock).pipe(
      delay(300),
      tap((cursos: Curso[]) => this.cursosSubject.next(cursos))
    );
  }

  /**
   * Obtiene un curso por ID
   */
  obtenerCursoPorId(id: string | number): Observable<Curso> {
    return this.getById<Curso>(this.endpoint, id);
  }

  /**
   * Crea un nuevo curso
   */
  crearCurso(curso: Omit<Curso, 'id' | 'fechaCreacion' | 'fechaActualizacion'>): Observable<Curso> {
    return this.post<Curso>(this.endpoint, curso)
      .pipe(
        tap((nuevoCurso: Curso) => {
          const cursosActuales = this.cursosSubject.value;
          this.cursosSubject.next([...cursosActuales, nuevoCurso]);
        })
      );
  }

  /**
   * Actualiza un curso existente
   */
  actualizarCurso(id: string | number, curso: Partial<Curso>): Observable<Curso> {
    return this.put<Curso>(this.endpoint, id, curso)
      .pipe(
        tap((cursoActualizado: Curso) => {
          const cursosActuales = this.cursosSubject.value;
          const index = cursosActuales.findIndex((c: Curso) => c.id === cursoActualizado.id);
          if (index !== -1) {
            cursosActuales[index] = cursoActualizado;
            this.cursosSubject.next([...cursosActuales]);
          }
        })
      );
  }

  /**
   * Elimina un curso
   */
  eliminarCurso(id: string | number): Observable<void> {
    return this.delete<void>(this.endpoint, id)
      .pipe(
        tap(() => {
          const cursosActuales = this.cursosSubject.value;
          const cursosActualizados = cursosActuales.filter((c: Curso) => c.id !== id);
          this.cursosSubject.next(cursosActualizados);
        })
      );
  }

  /**
   * Obtiene cursos de un profesor específico
   */
  obtenerCursosPorProfesor(profesorId: string | number): Observable<Curso[]> {
    const params = new HttpParams().set('profesor_id', profesorId.toString());
    return this.get<Curso[]>(this.endpoint, params);
  }

  /**
   * Inscribe un estudiante a un curso
   */
  inscribirEstudiante(cursoId: string | number, estudianteId: string | number): Observable<Curso> {
    return this.post<Curso>(`${this.endpoint}/${cursoId}/inscribir`, { estudiante_id: estudianteId })
      .pipe(
        tap((cursoActualizado: Curso) => {
          // Actualiza el curso en la lista
          const cursosActuales = this.cursosSubject.value;
          const index = cursosActuales.findIndex((c: Curso) => c.id === cursoActualizado.id);
          if (index !== -1) {
            cursosActuales[index] = cursoActualizado;
            this.cursosSubject.next([...cursosActuales]);
          }
        })
      );
  }

  /**
   * Retira un estudiante de un curso
   */
  retirarEstudiante(cursoId: string | number, estudianteId: string | number): Observable<Curso> {
    return this.post<Curso>(`${this.endpoint}/${cursoId}/retirar`, { estudiante_id: estudianteId })
      .pipe(
        tap((cursoActualizado: Curso) => {
          const cursosActuales = this.cursosSubject.value;
          const index = cursosActuales.findIndex((c: Curso) => c.id === cursoActualizado.id);
          if (index !== -1) {
            cursosActuales[index] = cursoActualizado;
            this.cursosSubject.next([...cursosActuales]);
          }
        })
      );
  }

  /**
   * Obtiene cursos disponibles para inscripción
   */
  obtenerCursosDisponibles(): Observable<Curso[]> {
    const params = new HttpParams().set('disponible', 'true');
    return this.get<Curso[]>(this.endpoint, params);
  }

  /**
   * Obtiene total de cursos
   */
  obtenerTotalCursos(): Observable<{ total: number }> {
    return this.get<{ total: number }>(`${this.endpoint}/stats/total`);
  }

  /**
   * Obtiene los cursos del BehaviorSubject (síncronamente)
   */
  obtenerCursosActuales(): Curso[] {
    return this.cursosSubject.value;
  }

  /**
   * Actualiza manualmente el BehaviorSubject
   */
  actualizarListaCursos(cursos: Curso[]): void {
    this.cursosSubject.next(cursos);
  }
}
