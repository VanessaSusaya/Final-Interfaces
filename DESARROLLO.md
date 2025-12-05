# Guía de Desarrollo - Sistema de Gestión Educativa

## 🎓 Conceptos Clave Implementados

### 1. Guards de Angular

#### AuthGuard
Protege rutas que requieren autenticación. Se aplica a todas las rutas excepto login.

```typescript
// Uso en rutas
{
  path: 'dashboard',
  canActivate: [AuthGuard],
  component: DashboardComponent
}
```

#### RoleGuard
Valida que el usuario tenga el rol necesario para acceder a una ruta.

```typescript
// Uso en rutas
{
  path: 'usuarios',
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['admin'] },
  component: ListaUsuariosComponent
}
```

### 2. Interceptores HTTP

El **JwtInterceptor** intercepta todas las peticiones HTTP para:
- Añadir el token JWT en el header `Authorization`
- Manejar errores 401 (token expirado/inválido)
- Realizar logout automático si es necesario

```typescript
// Interceptación automática
GET /api/usuarios
Headers: {
  Authorization: 'Bearer eyJhbGc...'
}
```

### 3. Lazy Loading de Rutas

Las rutas de características se cargan bajo demanda:

```typescript
{
  path: 'usuarios',
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['admin'] },
  loadChildren: () => import('./features/usuarios/usuarios.routes')
    .then(m => m.USUARIOS_ROUTES)
}
```

Beneficios:
- ⚡ Carga inicial más rápida
- 📦 Bundles más pequeños
- 🔄 Código modular y mantenible

### 4. RxJS y Observables

Manejo reactivo de datos asíncrónos:

```typescript
// BehaviorSubject para estado compartido
private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
public usuario$ = this.usuarioSubject.asObservable();

// Suscripción en componentes
this.authService.usuario$
  .pipe(takeUntil(this.destroy$))
  .subscribe(usuario => {
    this.usuario = usuario;
  });
```

## 📋 Flujos de Trabajo

### Flujo: Crear Nuevo Usuario (Admin)

```
1. Admin navega a /usuarios → ListaUsuariosComponent
2. Click en "+ Nuevo Usuario" → DestalleUsuarioComponent
3. Completa formulario
4. Envía POST /api/usuarios
   - JwtInterceptor añade token
5. UsuarioService → API
6. Respuesta exitosa → Actualizar lista
7. Redireccionar a /usuarios
```

### Flujo: Inscribir a Curso (Estudiante)

```
1. Estudiante en /cursos → ListaCursosComponent
2. Visualiza cursos disponibles
3. Click en "Inscribirse"
4. Envía POST /api/cursos/{id}/inscribir
   - Payload: { estudiante_id: '...' }
5. CursoService → API
6. Respuesta → Actualizar datos del curso
7. Notificar al usuario
```

### Flujo: Generar Reporte

```
1. Admin/Profesor en /reportes → ListaReportesComponent
2. Click en "Generar Reporte de Usuarios"
3. Envía POST /api/reportes/generar
   - Payload: { tipo: 'usuarios' }
4. ReporteService → API
5. Reporte generado → Añadido a lista
6. Usuario puede descargar PDF
```

## 🔧 Extensibilidad

### Agregar Nuevo Guard

```typescript
// src/app/core/guards/nuevo.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NuevoGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Lógica de validación
    return true;
  }
}
```

### Agregar Nuevo Servicio

```typescript
// src/app/core/services/nuevo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NuevoService {
  private apiUrl = `${environment.apiUrl}/nuevo`;

  constructor(private http: HttpClient) {}

  obtenerDatos() {
    return this.http.get(this.apiUrl);
  }
}
```

### Agregar Nuevo Componente

```typescript
// src/app/features/nueva-feature/pages/nueva-page/nueva.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-nueva',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './nueva.component.html',
  styleUrls: ['./nueva.component.scss']
})
export class NuevaComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Lógica de inicialización
  }
}
```

## 🧪 Testing

### Test de Guard

```typescript
describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['estaAutenticado']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('debe permitir acceso si está autenticado', () => {
    authService.estaAutenticado.and.returnValue(true);
    
    const resultado = guard.canActivate(null, null);
    
    expect(resultado).toBe(true);
  });

  it('debe denegar acceso si no está autenticado', () => {
    authService.estaAutenticado.and.returnValue(false);
    
    const resultado = guard.canActivate(null, null);
    
    expect(resultado).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
```

## 📚 Recursos Útiles

- [Documentación Angular](https://angular.io/docs)
- [JWT (JSON Web Tokens)](https://jwt.io)
- [RxJS Operators](https://rxjs.dev/api)
- [HTTP Client Guide](https://angular.io/guide/http)
- [Router Guide](https://angular.io/guide/router)

## 💡 Buenas Prácticas

1. ✅ Usar `takeUntil` para desuscribirse de observables
2. ✅ Implementar `OnDestroy` en componentes con suscripciones
3. ✅ Guardar tokens en localStorage (considerar `httpOnly` cookies en producción)
4. ✅ Validar roles en el backend también
5. ✅ Usar path aliases para imports limpios
6. ✅ Implementar error handling en servicios
7. ✅ Crear componentes compartidos reutilizables
8. ✅ Documentar cambios significativos

## 🚨 Consideraciones de Seguridad

1. **HTTPS**: Siempre usar HTTPS en producción
2. **CORS**: Configurar correctamente CORS en el backend
3. **Tokens**: No exponer tokens en URLs
4. **localStorage**: Considerar alternativas más seguras (httpOnly cookies)
5. **Validación**: Validar siempre en backend, no solo en frontend
6. **XSS**: Sanitizar entrada de usuarios
7. **CSRF**: Implementar protección CSRF en formularios

## 📞 Troubleshooting

### Error: Token expirado
```
Solución: El interceptor automáticamente redirige a /login
```

### Error: Acceso denegado (403)
```
Solución: Verificar rol del usuario en AuthService.obtenerRolActual()
```

### CORS Error
```
Solución: Configurar CORS en el backend para permitir localhost:4200
```

### Observable no se desuscribe
```
Solución: Implementar OnDestroy y usar takeUntil(this.destroy$)
```
