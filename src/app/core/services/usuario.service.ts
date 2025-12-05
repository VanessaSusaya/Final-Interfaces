import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, of, delay } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from '../models';
import { BaseHttpService } from './base-http.service';

/**
 * Servicio para gestión de usuarios
 * Implementa todas las operaciones CRUD
 * Hereda de BaseHttpService para manejo centralizado de errores
 */
@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseHttpService {
  private readonly endpoint = '/usuarios';
  private usuariosSubject = new BehaviorSubject<Usuario[]>([]);

  public usuarios$ = this.usuariosSubject.asObservable();

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * Obtiene la lista de todos los usuarios
   * Actualiza el BehaviorSubject con los datos
   */
  obtenerUsuarios(): Observable<Usuario[]> {
    // Datos mock mientras no haya backend
    const usuariosMock: Usuario[] = [
      {
        id: '1',
        email: 'admin@educativa.com',
        nombre: 'Administrador',
        apellido: 'Sistema',
        rol: 'admin',
        estado: true,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      },
      {
        id: '2',
        email: 'profesor@educativa.com',
        nombre: 'Juan',
        apellido: 'Profesor',
        rol: 'profesor',
        estado: true,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      },
      {
        id: '3',
        email: 'estudiante@educativa.com',
        nombre: 'María',
        apellido: 'Estudiante',
        rol: 'estudiante',
        estado: true,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      }
    ];
    
    return of(usuariosMock).pipe(
      delay(300),
      tap((usuarios: Usuario[]) => this.usuariosSubject.next(usuarios))
    );
  }

  /**
   * Obtiene un usuario por ID
   */
  obtenerUsuarioPorId(id: string | number): Observable<Usuario> {
    return this.getById<Usuario>(this.endpoint, id);
  }

  /**
   * Crea un nuevo usuario
   */
  crearUsuario(usuario: Omit<Usuario, 'id' | 'fechaCreacion' | 'fechaActualizacion'>): Observable<Usuario> {
    return this.post<Usuario>(this.endpoint, usuario)
      .pipe(
        tap((nuevoUsuario: Usuario) => {
          // Agrega el nuevo usuario a la lista
          const usuariosActuales = this.usuariosSubject.value;
          this.usuariosSubject.next([...usuariosActuales, nuevoUsuario]);
        })
      );
  }

  /**
   * Actualiza un usuario existente
   */
  actualizarUsuario(id: string | number, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.put<Usuario>(this.endpoint, id, usuario)
      .pipe(
        tap((usuarioActualizado: Usuario) => {
          // Actualiza la lista
          const usuariosActuales = this.usuariosSubject.value;
          const index = usuariosActuales.findIndex((u: Usuario) => u.id === usuarioActualizado.id);
          if (index !== -1) {
            usuariosActuales[index] = usuarioActualizado;
            this.usuariosSubject.next([...usuariosActuales]);
          }
        })
      );
  }

  /**
   * Elimina un usuario
   */
  eliminarUsuario(id: string | number): Observable<void> {
    return this.delete<void>(this.endpoint, id)
      .pipe(
        tap(() => {
          // Elimina de la lista
          const usuariosActuales = this.usuariosSubject.value;
          const usuariosActualizados = usuariosActuales.filter((u: Usuario) => u.id !== id);
          this.usuariosSubject.next(usuariosActualizados);
        })
      );
  }

  /**
   * Obtiene usuarios por rol
   */
  obtenerUsuariosPorRol(rol: string): Observable<Usuario[]> {
    const params = new HttpParams().set('rol', rol);
    return this.get<Usuario[]>(this.endpoint, params);
  }

  /**
   * Busca usuarios por nombre o email
   */
  buscarUsuarios(termino: string): Observable<Usuario[]> {
    const params = new HttpParams().set('busqueda', termino);
    return this.get<Usuario[]>(this.endpoint, params);
  }

  /**
   * Obtiene el total de usuarios
   */
  obtenerTotalUsuarios(): Observable<{ total: number }> {
    return this.get<{ total: number }>(`${this.endpoint}/stats/total`);
  }

  /**
   * Obten los usuarios del BehaviorSubject (síncronamente)
   */
  obtenerUsuariosActuales(): Usuario[] {
    return this.usuariosSubject.value;
  }

  /**
   * Actualiza manualmente el BehaviorSubject
   */
  actualizarListaUsuarios(usuarios: Usuario[]): void {
    this.usuariosSubject.next(usuarios);
  }
}
