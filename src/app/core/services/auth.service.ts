import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map, timer, Subject, of, delay, throwError, catchError } from 'rxjs';
import { environment } from '@environments/environment';
import { LoginRequest, LoginResponse, Usuario, JwtPayload } from '../models';

/**
 * Servicio de autenticación
 * Gestiona:
 * - Login/Logout
 * - Almacenamiento seguro de tokens
 * - Validación de tokens
 * - Información del usuario actual
 * - Observable del estado de autenticación
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly tokenKey = 'auth_token';
  private readonly usuarioKey = 'usuario';
  private readonly tokenExpirationWarning = 5 * 60 * 1000; // 5 minutos

  // Subject para el usuario autenticado
  private usuarioSubject = new BehaviorSubject<Usuario | null>(this.obtenerUsuarioLocal());
  public usuario$ = this.usuarioSubject.asObservable();

  // Subject para el estado de autenticación
  private autenticadoSubject = new BehaviorSubject<boolean>(this.estaAutenticadoVerificado());
  public autenticado$ = this.autenticadoSubject.asObservable();

  // Subject para alertas de expiración
  private tokenExpirando$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.cargarUsuarioDelToken();
    this.monitorizarExpiracionToken();
  }

  /**
   * Realiza login con email y contraseña
   */
  login(credenciales: LoginRequest): Observable<LoginResponse> {
    console.log('🚀 Iniciando login con:', credenciales.email);
    
    return new Observable(observer => {
      // Validación de usuario
      const usuariosMock = [
        {
          id: '1',
          email: 'admin@educativa.com',
          nombre: 'Administrador',
          apellido: 'Sistema',
          rol: 'admin' as const,
          estado: true,
          fechaCreacion: new Date(),
          fechaActualizacion: new Date()
        },
        {
          id: '2',
          email: 'profesor@educativa.com',
          nombre: 'Juan',
          apellido: 'Profesor',
          rol: 'profesor' as const,
          estado: true,
          fechaCreacion: new Date(),
          fechaActualizacion: new Date()
        },
        {
          id: '3',
          email: 'estudiante@educativa.com',
          nombre: 'María',
          apellido: 'Estudiante',
          rol: 'estudiante' as const,
          estado: true,
          fechaCreacion: new Date(),
          fechaActualizacion: new Date()
        }
      ];

      const usuario = usuariosMock.find(u => u.email === credenciales.email);

      if (!usuario) {
        console.error('❌ Usuario no encontrado');
        observer.error({ message: 'Usuario no encontrado', error: { message: 'Usuario no encontrado' } });
        return;
      }

      const passwordEsperada = credenciales.email.split('@')[0] + '123';
      if (credenciales.password !== passwordEsperada) {
        console.error('❌ Contraseña incorrecta');
        observer.error({ message: 'Contraseña incorrecta', error: { message: 'Contraseña incorrecta' } });
        return;
      }

      // Generar token
      const tokenSimulado = btoa(JSON.stringify({
        sub: usuario.id,
        email: usuario.email,
        rol: usuario.rol,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 86400
      }));

      const respuesta: LoginResponse = {
        token: tokenSimulado,
        usuario: usuario
      };

      console.log('✅ Validación exitosa para:', usuario.email);

      // Simular delay de red
      setTimeout(() => {
        try {
          console.log('📝 Guardando datos...');
          this.guardarToken(respuesta.token);
          this.usuarioSubject.next(respuesta.usuario);
          this.autenticadoSubject.next(true);
          this.guardarUsuarioLocal(respuesta.usuario);
          console.log('✅ Login completado correctamente');
          observer.next(respuesta);
          observer.complete();
        } catch (error) {
          console.error('Error al guardar datos:', error);
          observer.error(error);
        }
      }, 800);
    });
  }

  /**
   * Realiza logout y limpia el estado
   */
  logout(): void {
    console.log('Cerrando sesión...');
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usuarioKey);
    this.usuarioSubject.next(null);
    this.autenticadoSubject.next(false);
  }

  /**
   * Obtiene el token JWT almacenado
   */
  obtenerToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Guarda el token JWT en localStorage
   */
  private guardarToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Verifica si el usuario está autenticado
   * Valida la existencia y vigencia del token
   */
  estaAutenticado(): boolean {
    return this.estaAutenticadoVerificado();
  }

  /**
   * Método privado para verificar autenticación
   */
  private estaAutenticadoVerificado(): boolean {
    const token = this.obtenerToken();
    if (!token) {
      return false;
    }

    const payload = this.decodificarToken(token);
    if (!payload) {
      return false;
    }

    // Verifica si el token no ha expirado
    const ahora = Math.floor(Date.now() / 1000);
    const tokenVigente = payload.exp > ahora;

    if (!tokenVigente) {
      // Token expirado, limpia la sesión
      this.logout();
    }

    return tokenVigente;
  }

  /**
   * Decodifica el JWT sin verificar firma (solo lectura de payload)
   * Implementación segura con validación
   */
  decodificarToken(token: string): JwtPayload | null {
    try {
      const partes = token.split('.');
      if (partes.length !== 3) {
        console.error('Formato de token inválido');
        return null;
      }

      // Decodifica el payload (segunda parte)
      const payloadBase64 = partes[1];
      // Añade padding si es necesario
      const payloadPadded = payloadBase64 + '=='.substring(0, (4 - payloadBase64.length % 4) % 4);
      const payload = JSON.parse(atob(payloadPadded));

      return payload as JwtPayload;
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  }

  /**
   * Obtiene el rol del usuario actual
   */
  obtenerRolActual(): string | null {
    const token = this.obtenerToken();
    if (!token) {
      return null;
    }

    const payload = this.decodificarToken(token);
    return payload?.rol ?? null;
  }

  /**
   * Obtiene el email del usuario actual
   */
  obtenerEmailActual(): string | null {
    const token = this.obtenerToken();
    if (!token) {
      return null;
    }

    const payload = this.decodificarToken(token);
    return payload?.email ?? null;
  }

  /**
   * Obtiene el ID del usuario actual
   */
  obtenerIdActual(): string | null {
    const token = this.obtenerToken();
    if (!token) {
      return null;
    }

    const payload = this.decodificarToken(token);
    return payload?.sub ?? null;
  }

  /**
   * Guarda usuario en localStorage
   */
  private guardarUsuarioLocal(usuario: Usuario): void {
    localStorage.setItem(this.usuarioKey, JSON.stringify(usuario));
  }

  /**
   * Obtiene usuario del localStorage
   */
  private obtenerUsuarioLocal(): Usuario | null {
    const usuarioJson = localStorage.getItem(this.usuarioKey);
    return usuarioJson ? JSON.parse(usuarioJson) : null;
  }

  /**
   * Carga el usuario del token si existe
   */
  private cargarUsuarioDelToken(): void {
    if (this.estaAutenticadoVerificado()) {
      const usuario = this.obtenerUsuarioLocal();
      if (usuario) {
        this.usuarioSubject.next(usuario);
        this.autenticadoSubject.next(true);
      }
    }
  }

  /**
   * Obtiene el usuario actual como Observable
   */
  obtenerUsuarioActual(): Observable<Usuario | null> {
    return this.usuario$;
  }

  /**
   * Obtiene el estado de autenticación como Observable
   */
  obtenerEstadoAutenticacion(): Observable<boolean> {
    return this.autenticado$;
  }

  /**
   * Observable para alertas de expiración próxima
   */
  obtenerAlertaExpiracion(): Observable<void> {
    return this.tokenExpirando$.asObservable();
  }

  /**
   * Monitoriza la expiración del token
   */
  private monitorizarExpiracionToken(): void {
    const verificar = () => {
      const token = this.obtenerToken();
      if (!token) return;

      const payload = this.decodificarToken(token);
      if (!payload) return;

      const ahora = Math.floor(Date.now() / 1000);
      const tiempoRestante = (payload.exp - ahora) * 1000;

      if (tiempoRestante > 0 && tiempoRestante < this.tokenExpirationWarning) {
        // Token expirará en menos de 5 minutos
        this.tokenExpirando$.next();
      }

      if (tiempoRestante > 0) {
        // Verifica de nuevo cuando queden 5 minutos o en 1 minuto
        const proximaVerificacion = Math.min(tiempoRestante - this.tokenExpirationWarning, 60000);
        setTimeout(verificar, proximaVerificacion);
      }
    };

    // Inicia la monitorización
    verificar();
  }

  /**
   * Verifica si el usuario tiene un rol específico
   */
  tieneRol(rol: string | string[]): Observable<boolean> {
    const rolesVerificar = Array.isArray(rol) ? rol : [rol];
    return this.usuario$.pipe(
      map((usuario: Usuario | null) => {
        if (!usuario) return false;
        return rolesVerificar.includes(usuario.rol);
      })
    );
  }

  /**
   * Información del token para debugging
   */
  obtenerInfoToken(): any {
    const token = this.obtenerToken();
    if (!token) return null;

    const payload = this.decodificarToken(token);
    if (!payload) return null;

    const ahora = Math.floor(Date.now() / 1000);
    const expiracion = new Date(payload.exp * 1000);

    return {
      email: payload.email,
      rol: payload.rol,
      expedido: new Date(payload.iat * 1000),
      expira: expiracion,
      expiraEn: Math.round((payload.exp - ahora) / 60) + ' minutos',
      vigente: payload.exp > ahora
    };
  }
}
