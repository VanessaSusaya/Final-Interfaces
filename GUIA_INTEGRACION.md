# 🔧 GUÍA DE INTEGRACIÓN - NUEVAS FUNCIONALIDADES

**Proyecto**: Sistema de Gestión Educativa v2.0
**Última actualización**: 4 de diciembre de 2025

---

## 📑 Índice

1. [Pipes Personalizados](#pipes-personalizados)
2. [Directivas Personalizadas](#directivas-personalizadas)
3. [Guards Avanzados](#guards-avanzados)
4. [BaseHttpService](#basehttpservice)
5. [Interceptores](#interceptores)
6. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## 🎨 Pipes Personalizados

### DateFormatPipe

**Ubicación**: `src/app/shared/pipes/date-format.pipe.ts`

**Función**: Formatea fechas en español con diferentes niveles de detalle

**Importación**:
```typescript
import { DateFormatPipe } from '@shared/pipes';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [DateFormatPipe]
})
```

**Uso en HTML**:
```html
<!-- Formato corto: 4/12/2025 -->
{{ usuario.fechaCreacion | appDateFormat:'short' }}

<!-- Formato medio: 4 dic 2025 -->
{{ usuario.fechaCreacion | appDateFormat:'medium' }}

<!-- Formato largo: 4 de diciembre de 2025 -->
{{ usuario.fechaCreacion | appDateFormat:'long' }}

<!-- Formato completo: jueves, 4 de diciembre de 2025 14:30 -->
{{ usuario.fechaCreacion | appDateFormat:'full' }}
```

**Formatos soportados**:
- `short`: Numérico corto (dd/mm/yyyy)
- `medium`: Mes abreviado (dd mmm yyyy)
- `long`: Mes completo (dd de mmmm de yyyy)
- `full`: Día de semana completo + hora

---

### TextTransformPipe

**Ubicación**: `src/app/shared/pipes/text-transform.pipe.ts`

**Función**: Transforma texto con múltiples opciones

**Importación**:
```typescript
import { TextTransformPipe } from '@shared/pipes';

@Component({
  standalone: true,
  imports: [TextTransformPipe]
})
```

**Uso en HTML**:
```html
<!-- Mayúsculas -->
{{ usuario.nombre | appTextTransform:'uppercase' }}
<!-- JUAN PÉREZ -->

<!-- Minúsculas -->
{{ usuario.email | appTextTransform:'lowercase' }}
<!-- juan.perez@ejemplo.com -->

<!-- Capitalizar cada palabra -->
{{ usuario.nombre | appTextTransform:'capitalize' }}
<!-- Juan Pérez -->

<!-- Invertir -->
{{ usuario.codigo | appTextTransform:'reverse' }}
<!-- MRP0012 → 2102MRP -->
```

**Transformaciones**:
- `uppercase`: TODO EN MAYÚSCULAS
- `lowercase`: todo en minúsculas
- `capitalize`: Cada Palabra Capitalizada
- `reverse`: txet odaterI

---

### SafeHtmlPipe

**Ubicación**: `src/app/shared/pipes/safe-html.pipe.ts`

**Función**: Permite renderizar HTML confiable sin sanitización

**Importación**:
```typescript
import { SafeHtmlPipe } from '@shared/pipes';

@Component({
  standalone: true,
  imports: [SafeHtmlPipe]
})
```

**Uso en HTML**:
```html
<!-- ⚠️ Sin pipe - HTML se escapa como texto -->
<div>{{ htmlContent }}</div>
<!-- Resultado: <b>Texto bold</b> (como texto) -->

<!-- ✅ Con pipe - HTML se renderiza -->
<div [innerHTML]="htmlContent | appSafeHtml"></div>
<!-- Resultado: Texto bold (formateado) -->
```

**Componente**:
```typescript
export class MiComponente {
  htmlContent = '<b>Este texto está en bold</b>';
  // Ahora se renderi
zará como HTML
}
```

---

### FilterPipe

**Ubicación**: `src/app/shared/pipes/filter.pipe.ts`

**Función**: Filtra arrays en tiempo real

**Importación**:
```typescript
import { FilterPipe } from '@shared/pipes';

@Component({
  standalone: true,
  imports: [FilterPipe]
})
```

**Uso en HTML**:
```html
<!-- Filtrar en cualquier propiedad -->
<input [(ngModel)]="busqueda">

<!-- Filtro genérico (todas las propiedades) -->
<div *ngFor="let usuario of usuarios | appFilter:busqueda">
  {{ usuario.nombre }} - {{ usuario.email }}
</div>

<!-- Filtro en propiedad específica -->
<div *ngFor="let usuario of usuarios | appFilter:busqueda:'nombre'">
  {{ usuario.nombre }}
</div>

<!-- Filtro por rol -->
<div *ngFor="let usuario of usuarios | appFilter:'admin':'rol'">
  {{ usuario.nombre }} - Admin
</div>
```

**Componente**:
```typescript
export class ListaUsuariosComponent {
  usuarios: Usuario[] = [];
  busqueda: string = '';

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.obtenerUsuarios().subscribe(
      (data) => this.usuarios = data
    );
  }
}
```

---

## 🎯 Directivas Personalizadas

### HighlightDirective

**Ubicación**: `src/app/shared/directives/highlight.directive.ts`

**Función**: Resalta elementos con color de fondo

**Importación**:
```typescript
import { HighlightDirective } from '@shared/directives';

@Component({
  standalone: true,
  imports: [HighlightDirective]
})
```

**Uso en HTML**:
```html
<!-- Color de fondo predeterminado (amarillo) -->
<div appHighlight>Contenido resaltado</div>

<!-- Color personalizado -->
<div appHighlight="lightblue">Información</div>

<!-- Color de texto personalizado -->
<div appHighlight="red" highlightTextColor="white">
  ⚠️ Alerta importante
</div>

<!-- Combinaciones útiles -->
<div appHighlight="lightyellow" highlightTextColor="black">
  📌 Nota importante
</div>

<div appHighlight="lightgreen" highlightTextColor="darkgreen">
  ✅ Operación exitosa
</div>

<div appHighlight="lightcoral" highlightTextColor="darkred">
  ❌ Error encontrado
</div>
```

---

### HasRoleDirective

**Ubicación**: `src/app/shared/directives/has-role.directive.ts`

**Función**: Muestra/oculta elementos según el rol del usuario

**Importación**:
```typescript
import { HasRoleDirective } from '@shared/directives';

@Component({
  standalone: true,
  imports: [HasRoleDirective]
})
```

**Uso en HTML**:
```html
<!-- Solo para un rol -->
<div *appHasRole="'admin'">
  <button>Eliminar usuario</button>
</div>

<!-- Solo para profesores -->
<div *appHasRole="'profesor'">
  <button>Calificar estudiante</button>
</div>

<!-- Solo para estudiantes -->
<div *appHasRole="'estudiante'">
  <button>Ver mis calificaciones</button>
</div>

<!-- Múltiples roles (array) -->
<div *appHasRole="['admin', 'profesor']">
  <button>Generar reportes</button>
</div>
```

**Cómo funciona**:
1. Obtiene el rol actual del token JWT
2. Compara con el rol requerido
3. Muestra si coincide, oculta si no

---

### LoadingDirective

**Ubicación**: `src/app/shared/directives/loading.directive.ts`

**Función**: Muestra/oculta spinner durante carga

**Importación**:
```typescript
import { LoadingDirective } from '@shared/directives';

@Component({
  standalone: true,
  imports: [LoadingDirective]
})
```

**Uso en HTML**:
```html
<!-- Contenedor que se atenúa durante carga -->
<div appLoading [appLoading]="cargando">
  <!-- Contenido que se muestra/oculta -->
  <table *ngIf="!cargando">
    <tr *ngFor="let usuario of usuarios">
      <td>{{ usuario.nombre }}</td>
    </tr>
  </table>
</div>

<!-- En formularios -->
<form appLoading [appLoading]="enviando">
  <input [(ngModel)]="nombre">
  <button [disabled]="enviando">Guardar</button>
</form>
```

**Componente**:
```typescript
export class ListaUsuariosComponent {
  usuarios: Usuario[] = [];
  cargando = false;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.cargando = true;
    this.usuarioService.obtenerUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        this.cargando = false;
      }
    );
  }
}
```

---

### DisableOnLoadDirective

**Ubicación**: `src/app/shared/directives/disable-on-load.directive.ts`

**Función**: Deshabilita elementos durante carga

**Importación**:
```typescript
import { DisableOnLoadDirective } from '@shared/directives';

@Component({
  standalone: true,
  imports: [DisableOnLoadDirective]
})
```

**Uso en HTML**:
```html
<!-- Botón que se deshabilita durante envío -->
<button appDisableOnLoad [appDisableOnLoad]="enviando">
  Guardar cambios
</button>

<!-- Formulario con validación -->
<form (ngSubmit)="enviar()">
  <input [(ngModel)]="email" required>
  <button appDisableOnLoad [appDisableOnLoad]="enviando">
    {{ enviando ? 'Enviando...' : 'Enviar' }}
  </button>
</form>

<!-- En campos de entrada -->
<input appDisableOnLoad [appDisableOnLoad]="procesando" 
       type="text" placeholder="Nombre">
```

**Componente**:
```typescript
export class FormularioComponent {
  email = '';
  enviando = false;

  enviar() {
    this.enviando = true;
    this.servicioEmail.enviar(this.email).subscribe(
      () => {
        this.enviando = false;
        alert('Enviado exitosamente');
      },
      (error) => {
        this.enviando = false;
        alert('Error: ' + error.message);
      }
    );
  }
}
```

---

## 🔐 Guards Avanzados

### LoginGuard

**Ubicación**: `src/app/core/guards/login.guard.ts`

**Propósito**: Prevenir que usuarios autenticados vuelvan a /login

**Cómo funciona**:
```
Si usuario YA está autenticado
  → Redirige a /dashboard
  → NO permite acceso a /login

Si usuario NO está autenticado
  → Permite acceso a /login normalmente
```

**Uso en rutas**:
```typescript
{
  path: 'login',
  canActivate: [LoginGuard],  // ← Previene re-entrada
  loadChildren: () => import('./features/auth/auth.routes')
    .then(m => m.AUTH_ROUTES)
}
```

**Beneficio**: Los usuarios no pueden retroceder a login si ya iniciaron sesión

---

### AuthGuard (Mejorado)

**Ubicación**: `src/app/core/guards/auth.guard.ts`

**Cambios en v2.0**:
- ✅ Implementa `CanActivateChild` (protege subrutas)
- ✅ Mejor logging
- ✅ Validación más robusta
- ✅ Logout automático si token expira

**Uso en rutas**:
```typescript
{
  path: 'dashboard',
  canActivate: [AuthGuard],           // Protege ruta principal
  canActivateChild: [AuthGuard],      // Protege subrutas
  loadChildren: () => import('./features/dashboard/dashboard.routes')
}
```

---

### RoleGuard (Mejorado)

**Ubicación**: `src/app/core/guards/role.guard.ts`

**Cambios en v2.0**:
- ✅ Implementa `CanActivateChild`
- ✅ Mejor logging de accesos
- ✅ Manejo de errores mejorado
- ✅ Redirección a página de acceso denegado

**Uso en rutas**:
```typescript
{
  path: 'usuarios',
  canActivate: [AuthGuard, RoleGuard],
  canActivateChild: [AuthGuard, RoleGuard],
  data: { roles: ['admin'] },  // Solo administradores
  loadChildren: () => import('./features/usuarios/usuarios.routes')
}

{
  path: 'reportes',
  canActivate: [AuthGuard, RoleGuard],
  canActivateChild: [AuthGuard, RoleGuard],
  data: { roles: ['admin', 'profesor'] },  // Múltiples roles
  loadChildren: () => import('./features/reportes/reportes.routes')
}
```

---

## 🌐 BaseHttpService

### Concepto

Clase base que centraliza toda la lógica HTTP para evitar duplicación

### Ubicación

`src/app/core/services/base-http.service.ts`

### Métodos disponibles

```typescript
// GET - todos los registros
protected get<T>(endpoint: string, params?: HttpParams): Observable<T>

// GET - un registro por ID
protected getById<T>(endpoint: string, id: string | number): Observable<T>

// POST - crear nuevo
protected post<T>(endpoint: string, data: any): Observable<T>

// PUT - actualizar completo
protected put<T>(endpoint: string, id: string | number, data: any): Observable<T>

// PATCH - actualizar parcial
protected patch<T>(endpoint: string, id: string | number, data: any): Observable<T>

// DELETE - eliminar
protected delete<T>(endpoint: string, id: string | number): Observable<T>

// DELETE múltiples
protected deleteMultiple<T>(endpoint: string, ids: (string | number)[]): Observable<T>

// Descargar archivo
protected descargarArchivo(endpoint: string, filename: string): Observable<Blob>

// Subir archivo
protected subirArchivo<T>(endpoint: string, archivo: File): Observable<T>
```

### Ejemplo de uso

**Crear un nuevo servicio**:
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './base-http.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

@Injectable({ providedIn: 'root' })
export class ProductoService extends BaseHttpService {
  private endpoint = '/productos';

  constructor(http: HttpClient) {
    super(http);
  }

  obtenerProductos(): Observable<Producto[]> {
    return this.get<Producto[]>(this.endpoint);
  }

  obtenerProductoPorId(id: number): Observable<Producto> {
    return this.getById<Producto>(this.endpoint, id);
  }

  crearProducto(producto: Omit<Producto, 'id'>): Observable<Producto> {
    return this.post<Producto>(this.endpoint, producto);
  }

  actualizarProducto(id: number, producto: Partial<Producto>): Observable<Producto> {
    return this.put<Producto>(this.endpoint, id, producto);
  }

  eliminarProducto(id: number): Observable<void> {
    return this.delete<void>(this.endpoint, id);
  }

  // ¡Listo! Heredas automaticamente:
  // - Manejo de errores
  // - Validación de respuestas
  // - Logging
}
```

**Uso en componente**:
```typescript
@Component({
  selector: 'app-productos',
  standalone: true
})
export class ProductosComponent {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.productoService.obtenerProductos().subscribe({
      next: (datos) => this.productos = datos,
      error: (error) => console.error('Error:', error.message)
    });
  }

  crear() {
    const nuevoProducto = { nombre: 'Producto X', precio: 100 };
    this.productoService.crearProducto(nuevoProducto).subscribe({
      next: (producto) => {
        this.productos.push(producto);
      },
      error: (error) => console.error('Error:', error.message)
    });
  }
}
```

---

## 🔗 Interceptores

### JwtInterceptor (Mejorado)

**Ubicación**: `src/app/core/interceptors/jwt.interceptor.ts`

**Funciones**:
1. Adjunta token JWT automáticamente
2. Valida expiraciones
3. Maneja errores 401/403/5xx
4. Registra peticiones

**Flujo de interceptación**:
```
Petición HTTP
    ↓
JwtInterceptor
    ├─ Obtiene token
    ├─ Adjunta Authorization header
    ├─ Agrega Content-Type
    ↓
Backend recibe petición con token
    ↓
Respuesta
    ↓
JwtInterceptor catch
    ├─ Si 401 → logout automático
    ├─ Si 403 → redirige a /acceso-denegado
    ├─ Si 5xx → mensaje de error
    ↓
Componente recibe respuesta
```

---

### ErrorInterceptor (Nuevo)

**Ubicación**: `src/app/core/interceptors/error.interceptor.ts`

**Funciones**:
1. Construye mensajes de error significativos
2. Registra errores para debugging
3. Manejo específico por tipo de error
4. Mapeo de códigos HTTP a mensajes claros

**Mensajes generados**:
```
400 → "Solicitud inválida"
401 → "Sesión expirada. Por favor, inicie sesión nuevamente."
403 → "No tiene permisos para realizar esta acción"
404 → "Recurso no encontrado"
500 → "Error interno del servidor"
503 → "Servicio no disponible"
```

**Uso automático** (sin código adicional):
```typescript
// Todos los errores HTTP se manejan automáticamente
this.usuarioService.obtenerUsuarios().subscribe({
  next: (datos) => { },
  error: (error) => {
    console.error(error.message);  // Mensaje significativo
    // El error ya fue registrado en console.error
  }
});
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Componente de Login

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <form [formGroup]="formulario" (ngSubmit)="enviar()">
      <input formControlName="email" placeholder="Email">
      <input formControlName="contrasena" type="password" 
             placeholder="Contraseña">
      <button [disabled]="enviando">
        {{ enviando ? 'Iniciando sesión...' : 'Iniciar sesión' }}
      </button>
    </form>
  `,
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  formulario: FormGroup;
  enviando = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formulario = this.fb.group({
      email: [''],
      contrasena: ['']
    });
  }

  enviar() {
    this.enviando = true;
    this.authService.login({
      email: this.formulario.value.email,
      password: this.formulario.value.contrasena
    }).subscribe({
      next: (response) => {
        // AuthGuard permite acceso a /dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.enviando = false;
        alert(error.message);
      }
    });
  }
}
```

---

### Ejemplo 2: Lista con Filtro y Pipes

```typescript
import { Component } from '@angular/core';
import { UsuarioService } from '@core/services';
import { DateFormatPipe, FilterPipe, TextTransformPipe } from '@shared/pipes';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-usuarios',
  template: `
    <div>
      <input [(ngModel)]="busqueda" placeholder="Buscar usuario...">
      
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Fecha Creación</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let usuario of usuarios | appFilter:busqueda:'nombre'">
            <td>{{ usuario.nombre | appTextTransform:'capitalize' }}</td>
            <td>{{ usuario.email | appTextTransform:'lowercase' }}</td>
            <td>{{ usuario.rol | appTextTransform:'capitalize' }}</td>
            <td>{{ usuario.fechaCreacion | appDateFormat:'medium' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule, FilterPipe, TextTransformPipe, DateFormatPipe]
})
export class ListaUsuariosComponent {
  usuarios: any[] = [];
  busqueda = '';

  constructor(private usuarioService: UsuarioService) {
    this.usuarioService.obtenerUsuarios().subscribe(
      (datos) => this.usuarios = datos
    );
  }
}
```

---

### Ejemplo 3: Página protegida por rol

```typescript
import { Component } from '@angular/core';
import { HasRoleDirective } from '@shared/directives';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reportes',
  template: `
    <div>
      <h1>Reportes</h1>

      <!-- Solo para administradores -->
      <div *appHasRole="'admin'">
        <button (click)="generarReporteUsuarios()">
          Reporte de Usuarios
        </button>
      </div>

      <!-- Para admin o profesor -->
      <div *appHasRole="['admin', 'profesor']">
        <button (click)="generarReporteCursos()">
          Reporte de Cursos
        </button>
      </div>

      <!-- Para cualquier usuario autenticado -->
      <button (click)="descargarReporte()">
        Descargar mis reportes
      </button>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, HasRoleDirective]
})
export class ReportesComponent {
  constructor(private reporteService: ReporteService) {}

  generarReporteUsuarios() {
    this.reporteService.generarReporteUsuarios().subscribe(
      (reporte) => console.log('Reporte generado:', reporte)
    );
  }

  generarReporteCursos() {
    this.reporteService.generarReporteCursos().subscribe(
      (reporte) => console.log('Reporte generado:', reporte)
    );
  }

  descargarReporte() {
    // Solo se ve para usuarios autenticados
  }
}
```

---

## 🎓 Conclusión

Todas estas funcionalidades trabajan juntas para crear una aplicación:

- ✅ **Segura**: Guards protegen rutas
- ✅ **Robusta**: Interceptores manejan errores
- ✅ **Reutilizable**: Pipes y directivas personalizadas
- ✅ **Mantenible**: BaseHttpService centraliza lógica
- ✅ **Escalable**: Fácil agregar nuevas funcionalidades

**¡Listo para desarrollar!** 🚀
