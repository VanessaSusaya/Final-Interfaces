# 📖 Referencia Rápida - Sistema de Gestión Educativa

## Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm start

# 3. Abrir navegador en http://localhost:4200
```

## Credenciales Rápidas

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Admin | admin@educativa.com | admin123 |
| Profesor | profesor@educativa.com | profesor123 |
| Estudiante | estudiante@educativa.com | estudiante123 |

## Comandos Principales

```bash
# Desarrollo
npm start

# Build producción
npm run build

# Watch mode (reconstruye al cambiar archivos)
npm run watch

# Tests
npm test

# Lint
npm run lint
```

## Estructura de Carpetas - Referencia

```
core/          → Servicios, guards, interceptores, modelos
features/      → Módulos de características (auth, dashboard, usuarios, cursos, reportes)
shared/        → Componentes, directivas, pipes reutilizables
assets/        → Imágenes, estilos adicionales
environments/  → Configuración por ambiente
```

## Crear Nuevo Componente (Standalone)

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mi-componente',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mi-componente.component.html',
  styleUrls: ['./mi-componente.component.scss']
})
export class MiComponenteComponent {
  constructor() {}
}
```

## Inyección de Servicios

```typescript
import { AuthService, UsuarioService } from '@core/services';

export class MiComponente {
  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) {}
}
```

## Suscripciones con takeUntil

```typescript
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class MiComponente implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.servicio.datos$
      .pipe(takeUntil(this.destroy$))
      .subscribe(datos => {
        // hacer algo
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

## Guards en Rutas

```typescript
// Ruta protegida por autenticación
{
  path: 'dashboard',
  canActivate: [AuthGuard],
  component: DashboardComponent
}

// Ruta protegida por rol
{
  path: 'usuarios',
  canActivate: [AuthGuard, RoleGuard],
  data: { roles: ['admin'] },
  component: ListaUsuariosComponent
}
```

## Lazy Loading

```typescript
{
  path: 'cursos',
  canActivate: [AuthGuard],
  loadChildren: () => import('./features/cursos/cursos.routes')
    .then(m => m.CURSOS_ROUTES)
}
```

## Peticiones HTTP

```typescript
// GET
this.http.get<Usuario[]>('/api/usuarios')

// POST
this.http.post<Usuario>('/api/usuarios', nuevoUsuario)

// PUT
this.http.put<Usuario>('/api/usuarios/1', usuarioActualizado)

// DELETE
this.http.delete<void>('/api/usuarios/1')
```

## JWT - Decodificar Token

```typescript
const token = this.authService.obtenerToken();
const payload = this.authService.decodificarToken(token);

console.log(payload.email);  // usuario@example.com
console.log(payload.rol);    // admin
console.log(payload.exp);    // timestamp expiración
```

## BehaviorSubject - Estado Compartido

```typescript
// En servicio
private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
public usuario$ = this.usuarioSubject.asObservable();

// Actualizar estado
this.usuarioSubject.next(nuevoUsuario);

// Suscribirse en componente
this.servicio.usuario$
  .pipe(takeUntil(this.destroy$))
  .subscribe(usuario => console.log(usuario));
```

## Rutas con Parámetros

```typescript
// Definición
{
  path: 'usuarios/:id',
  component: DestalleUsuarioComponent
}

// En componente
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.params
    .pipe(takeUntil(this.destroy$))
    .subscribe(params => {
      const id = params['id'];
    });
}

// Navegar
this.router.navigate(['/usuarios', usuario.id]);

// En template
<a [routerLink]="['/usuarios', usuario.id]">Ver detalles</a>
```

## Formularios Reactivos

```typescript
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class MiComponente {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required]
    });
  }

  enviar() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
```

## Validación en Template

```html
<div class="form-group">
  <label for="email">Email</label>
  <input
    type="email"
    id="email"
    formControlName="email"
    [class.is-invalid]="
      form.get('email')?.invalid && form.get('email')?.touched
    "
  />
  <div class="error" *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
    Email inválido
  </div>
</div>

<button 
  type="submit" 
  [disabled]="form.invalid"
>
  Enviar
</button>
```

## Directivas Estructurales

```html
<!-- *ngIf -->
<div *ngIf="usuario">
  <p>{{ usuario.nombre }}</p>
</div>

<!-- *ngFor -->
<tr *ngFor="let usuario of usuarios">
  <td>{{ usuario.nombre }}</td>
</tr>

<!-- *ngSwitch -->
<div [ngSwitch]="usuario.rol">
  <div *ngSwitchCase="'admin'">Admin</div>
  <div *ngSwitchCase="'profesor'">Profesor</div>
  <div *ngSwitchDefault>Estudiante</div>
</div>
```

## Binding de Datos

```html
<!-- Interpolación -->
<p>{{ usuario.nombre }}</p>

<!-- Property binding -->
<img [src]="usuario.foto" />

<!-- Event binding -->
<button (click)="eliminar(usuario.id)">Eliminar</button>

<!-- Two-way binding -->
<input [(ngModel)]="usuario.nombre" />

<!-- Class binding -->
<div [ngClass]="{ 'activo': usuario.activo }"></div>

<!-- Style binding -->
<div [ngStyle]="{ 'color': usuario.activo ? 'green' : 'red' }"></div>
```

## Pipe - Formateo de Datos

```html
<!-- Date -->
<p>{{ usuario.fecha | date: 'short' }}</p>

<!-- Currency -->
<p>{{ precio | currency: 'COP' }}</p>

<!-- Uppercase/Lowercase -->
<p>{{ usuario.nombre | uppercase }}</p>

<!-- Slice -->
<p>{{ usuarios | slice: 0:5 }}</p>
```

## Path Aliases

```typescript
// Imports limpios usando aliases
import { AuthService } from '@core/services';
import { LoginComponent } from '@features/auth/pages/login/login.component';
import { environment } from '@environments/environment';

// En lugar de
import { AuthService } from '../../../../core/services/auth.service';
import { LoginComponent } from '../../../../features/auth/pages/login/login.component';
import { environment } from '../../../../environments/environment';
```

## Debugging

```typescript
// Console logging
console.log('Usuario:', usuario);
console.error('Error:', error);

// Breakpoints en DevTools
// F12 → Sources → Poner breakpoint

// Angular DevTools
// Extensión del navegador para debugging avanzado
```

## Manejo de Errores

```typescript
this.servicio.obtenerDatos().subscribe({
  next: (datos) => {
    console.log('Éxito:', datos);
  },
  error: (error) => {
    console.error('Error:', error.error?.message || 'Error desconocido');
  },
  complete: () => {
    console.log('Completado');
  }
});
```

## Recursos de Ayuda

- **Documentación**: https://angular.io/docs
- **DevTools**: F12 en el navegador
- **VS Code Extensions**: Angular Language Service
- **Comunidad**: Stack Overflow, Angular Discord

## Contacto y Soporte

Para preguntas sobre la estructura o implementación, consulta los archivos:
- `README.md` - Descripción general
- `ARQUITECTURA.md` - Diagramas y flujos
- `DESARROLLO.md` - Guía detallada de desarrollo
