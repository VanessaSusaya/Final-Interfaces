import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from '@environments/environment';
import { LoginRequest, LoginResponse, Usuario, JwtPayload } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly tokenKey = 'auth_token';
  private readonly usuarioKey = 'usuario';

  private usuarioSubject = new BehaviorSubject<Usuario | null>(this.obtenerUsuarioLocal());
  public usuario$ = this.usuarioSubject.asObservable();

  private autenticadoSubject = new BehaviorSubject<boolean>(this.estaAutenticadoVerificado());
  public autenticado$ = this.autenticadoSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarUsuarioDelToken();
  }

  // -------------------------
  // LOGIN SIMULADO
  // -------------------------
  login(credenciales: LoginRequest): Observable<LoginResponse> {
    return new Observable(observer => {

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

      const usuario = usuariosMock.find(u => u.email === credenciales.email);

      if (!usuario) {
        observer.error({ message: 'Usuario no encontrado' });
        return;
      }

      const passCorrecta = credenciales.email.split('@')[0] + '123';
      if (credenciales.password !== passCorrecta) {
        observer.error({ message: 'Contraseña incorrecta' });
        return;
      }

      // -----------------------
      // 🔥 TOKEN SIMULADO (2 partes)
      // -----------------------
      const payload = {
        sub: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400 // 24h
      };

      const token = this.crearTokenSimulado(payload);

      const respuesta: LoginResponse = {
        token,
        usuario
      };

      setTimeout(() => {
        this.guardarToken(token);
        this.guardarUsuarioLocal(usuario);

        this.usuarioSubject.next(usuario);
        this.autenticadoSubject.next(true);

        observer.next(respuesta);
        observer.complete();
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usuarioKey);
    this.usuarioSubject.next(null);
    this.autenticadoSubject.next(false);
  }

  // --------------------------------
  // TOKEN SIMULADO
  // --------------------------------
  private crearTokenSimulado(payload: any): string {
    const header = { alg: 'none', typ: 'JWT' };
    return btoa(JSON.stringify(header)) + '.' + btoa(JSON.stringify(payload));
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private guardarToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // --------------------------------
  // DECODIFICACIÓN DEL TOKEN
  // --------------------------------
  decodificarToken(token: string): JwtPayload | null {
    try {
      const partes = token.split('.');
      if (partes.length !== 2) return null;

      const payload = JSON.parse(atob(partes[1]));
      return payload;
    } catch {
      return null;
    }
  }

  // --------------------------------
  // VERIFICAR AUTENTICACIÓN
  // --------------------------------
  estaAutenticado(): boolean {
    return this.estaAutenticadoVerificado();
  }

  private estaAutenticadoVerificado(): boolean {
    const token = this.obtenerToken();
    if (!token) return false;

    const payload = this.decodificarToken(token);
    if (!payload) return false;

    const ahora = Math.floor(Date.now() / 1000);
    return payload.exp > ahora;
  }

  obtenerRolActual(): string | null {
    const p = this.decodificarToken(this.obtenerToken() || '');
    return p?.rol ?? null;
  }

  obtenerEmailActual(): string | null {
    const p = this.decodificarToken(this.obtenerToken() || '');
    return p?.email ?? null;
  }

  obtenerIdActual(): string | null {
    const p = this.decodificarToken(this.obtenerToken() || '');
    return p?.sub ?? null;
  }
  obtenerUsuarioActual(): Usuario | null {
  return this.obtenerUsuarioLocal();
  }


  // --------------------------------
  // LOCAL STORAGE
  // --------------------------------
  private guardarUsuarioLocal(usuario: Usuario): void {
    localStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
  }

  private obtenerUsuarioLocal(): Usuario | null {
    const data = localStorage.getItem(this.usuarioKey);
    return data ? JSON.parse(data) : null;
  }

  private cargarUsuarioDelToken(): void {
    if (this.estaAutenticado()) {
      this.usuarioSubject.next(this.obtenerUsuarioLocal());
      this.autenticadoSubject.next(true);
    }
  }
}
