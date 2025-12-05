# 📊 Diagrama de Estructura del Proyecto

## Árbol de Carpetas Completo

```
Proyecto_Final/
│
├─ src/
│  ├─ app/
│  │  ├─ core/                          [Módulo Core]
│  │  │  ├─ guards/
│  │  │  │  ├─ auth.guard.ts            ✅ Protege rutas privadas
│  │  │  │  ├─ role.guard.ts            ✅ Valida roles
│  │  │  │  └─ index.ts                 📤 Exporta guards
│  │  │  │
│  │  │  ├─ services/
│  │  │  │  ├─ auth.service.ts          🔐 Login, JWT, tokens
│  │  │  │  ├─ usuario.service.ts       👥 CRUD usuarios
│  │  │  │  ├─ curso.service.ts         📚 CRUD cursos
│  │  │  │  ├─ reporte.service.ts       📊 Generación reportes
│  │  │  │  └─ index.ts                 📤 Exporta servicios
│  │  │  │
│  │  │  ├─ interceptors/
│  │  │  │  ├─ jwt.interceptor.ts       🔒 Añade JWT a peticiones
│  │  │  │  └─ index.ts                 📤 Exporta interceptores
│  │  │  │
│  │  │  └─ models/
│  │  │     └─ index.ts                 📋 Interfaces y tipos
│  │  │
│  │  ├─ features/                      [Módulos de Características]
│  │  │  ├─ auth/
│  │  │  │  ├─ pages/
│  │  │  │  │  └─ login/
│  │  │  │  │     ├─ login.component.ts
│  │  │  │  │     ├─ login.component.html
│  │  │  │  │     └─ login.component.scss
│  │  │  │  ├─ components/              (Componentes reutilizables auth)
│  │  │  │  └─ auth.routes.ts           🛣️ Rutas del módulo
│  │  │  │
│  │  │  ├─ dashboard/
│  │  │  │  ├─ pages/
│  │  │  │  │  └─ dashboard/
│  │  │  │  │     ├─ dashboard.component.ts
│  │  │  │  │     ├─ dashboard.component.html
│  │  │  │  │     └─ dashboard.component.scss
│  │  │  │  ├─ components/
│  │  │  │  └─ dashboard.routes.ts      🛣️ Rutas del módulo
│  │  │  │
│  │  │  ├─ usuarios/
│  │  │  │  ├─ pages/
│  │  │  │  │  ├─ lista-usuarios/
│  │  │  │  │  │  ├─ lista-usuarios.component.ts
│  │  │  │  │  │  ├─ lista-usuarios.component.html
│  │  │  │  │  │  └─ lista-usuarios.component.scss
│  │  │  │  │  └─ detalle-usuario/
│  │  │  │  │     └─ detalle-usuario.component.ts
│  │  │  │  ├─ components/              (Componentes de usuarios)
│  │  │  │  └─ usuarios.routes.ts       🛣️ Rutas del módulo
│  │  │  │
│  │  │  ├─ cursos/
│  │  │  │  ├─ pages/
│  │  │  │  │  ├─ lista-cursos/
│  │  │  │  │  │  ├─ lista-cursos.component.ts
│  │  │  │  │  │  ├─ lista-cursos.component.html
│  │  │  │  │  │  └─ lista-cursos.component.scss
│  │  │  │  │  └─ detalle-curso/
│  │  │  │  │     └─ detalle-curso.component.ts
│  │  │  │  ├─ components/              (Componentes de cursos)
│  │  │  │  └─ cursos.routes.ts         🛣️ Rutas del módulo
│  │  │  │
│  │  │  └─ reportes/
│  │  │     ├─ pages/
│  │  │     │  └─ lista-reportes/
│  │  │     │     ├─ lista-reportes.component.ts
│  │  │     │     ├─ lista-reportes.component.html
│  │  │     │     └─ lista-reportes.component.scss
│  │  │     ├─ components/              (Componentes de reportes)
│  │  │     └─ reportes.routes.ts       🛣️ Rutas del módulo
│  │  │
│  │  ├─ shared/                        [Módulo Compartido]
│  │  │  ├─ components/                 (Componentes reutilizables)
│  │  │  ├─ directives/                 (Directivas personalizadas)
│  │  │  └─ pipes/                      (Pipes personalizadas)
│  │  │
│  │  ├─ app.component.ts               🏠 Componente raíz
│  │  ├─ app.config.ts                  ⚙️ Configuración app
│  │  └─ app.routes.ts                  🛣️ Rutas principales
│  │
│  ├─ assets/
│  │  ├─ images/                        🖼️ Imágenes
│  │  └─ styles/                        🎨 Estilos adicionales
│  │
│  ├─ environments/
│  │  ├─ environment.ts                 ⚙️ Config desarrollo
│  │  └─ environment.prod.ts            ⚙️ Config producción
│  │
│  ├─ main.ts                           🚀 Punto de entrada
│  ├─ index.html                        📄 HTML principal
│  └─ styles.scss                       🎨 Estilos globales
│
├─ angular.json                         ⚙️ Configuración Angular CLI
├─ tsconfig.json                        ⚙️ Config TypeScript
├─ package.json                         📦 Dependencias
├─ .gitignore                           🚫 Archivos a ignorar
├─ .editorconfig                        📝 Configuración editor
│
├─ README.md                            📖 Descripción general
├─ INSTALACION.md                       🚀 Guía de instalación
├─ ARQUITECTURA.md                      🏗️ Diagramas y flujos
├─ DESARROLLO.md                        💡 Guía de desarrollo
├─ REFERENCIA_RAPIDA.md                 ⚡ Referencia rápida
└─ API_SPEC.md                          📡 Especificación API

node_modules/                           (Generado por npm install)
dist/                                   (Generado por npm run build)
.angular/                               (Caché de Angular)
```

## Diagrama de Dependencias

```
app.component
    └── AppRouting
        ├── /login
        │   └── auth.routes
        │       └── LoginComponent
        │           ├── AuthService
        │           ├── Router
        │           └── FormBuilder
        │
        ├── /dashboard (AuthGuard)
        │   └── DashboardComponent
        │       ├── AuthService
        │       └── Router
        │
        ├── /usuarios (AuthGuard + RoleGuard [admin])
        │   └── usuarios.routes
        │       ├── ListaUsuariosComponent
        │       │   └── UsuarioService
        │       └── DestalleUsuarioComponent
        │           ├── UsuarioService
        │           └── FormBuilder
        │
        ├── /cursos (AuthGuard)
        │   └── cursos.routes
        │       ├── ListaCursosComponent
        │       │   └── CursoService
        │       └── DetalleCursoComponent
        │           ├── CursoService
        │           └── FormBuilder
        │
        └── /reportes (AuthGuard + RoleGuard [admin, profesor])
            └── reportes.routes
                └── ListaReportesComponent
                    └── ReporteService
```

## Capas de la Aplicación

```
┌─────────────────────────────────────────────────────┐
│                  PRESENTACIÓN (UI)                   │
│  Components, Templates, Estilos                      │
│  ├─ LoginComponent                                   │
│  ├─ DashboardComponent                               │
│  ├─ ListaUsuariosComponent                           │
│  ├─ ListaCursosComponent                             │
│  └─ ListaReportesComponent                           │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│                 LÓGICA (SERVICES)                    │
│  Lógica de negocio, gestión de estado               │
│  ├─ AuthService (Autenticación)                      │
│  ├─ UsuarioService (Usuarios)                        │
│  ├─ CursoService (Cursos)                            │
│  └─ ReporteService (Reportes)                        │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│              SEGURIDAD (GUARDS/INTERCEPTORS)         │
│  Control de acceso y autenticación                  │
│  ├─ AuthGuard (Proteger rutas)                       │
│  ├─ RoleGuard (Validar roles)                        │
│  └─ JwtInterceptor (Añadir token a peticiones)       │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│                HTTP CLIENT                           │
│  Comunicación con API                               │
│  └─ HttpClient (peticiones GET, POST, PUT, DELETE)   │
└──────────────────┬──────────────────────────────────┘
                   │
┌──────────────────▼──────────────────────────────────┐
│                   BACKEND API                        │
│  http://localhost:3000/api                          │
│  ├─ /auth (Autenticación)                            │
│  ├─ /usuarios (Usuarios CRUD)                        │
│  ├─ /cursos (Cursos CRUD)                            │
│  └─ /reportes (Reportes)                             │
└─────────────────────────────────────────────────────┘
```

## Flujo de Datos

```
Usuario
  │
  ├─ Ingresa credenciales en LoginComponent
  │  │
  │  └─→ AuthService.login()
  │      │
  │      └─→ HttpClient.post('/auth/login')
  │         │
  │         ├─→ Backend valida credenciales
  │         │
  │         └─→ Devuelve JWT + Usuario
  │
  ├─ AuthService almacena token
  │
  ├─ AuthService emite usuario via BehaviorSubject
  │
  ├─ Router navega a /dashboard
  │
  └─→ Dashboard muestra opciones según rol
      │
      ├─ Navega a /usuarios (solo admin)
      │ │
      │ └─→ ListaUsuariosComponent
      │     │
      │     └─→ UsuarioService.obtenerUsuarios()
      │        │
      │        └─→ HttpClient.get('/usuarios')
      │           │
      │           ├─→ JwtInterceptor añade token
      │           │
      │           └─→ Backend devuelve usuarios
      │
      ├─ Navega a /cursos
      │ │
      │ └─→ ListaCursosComponent
      │     │
      │     └─→ CursoService.obtenerCursos()
      │        │
      │        └─→ HttpClient.get('/cursos')
      │
      └─ Navega a /reportes
          │
          └─→ ListaReportesComponent
              │
              └─→ ReporteService.generarReporteUsuarios()
                 │
                 └─→ HttpClient.post('/reportes/generar')
```

## Estado de la Aplicación

```
localStorage
├── auth_token: "eyJhbGc..." (JWT Token)
└── usuario: {
    "id": "...",
    "nombre": "...",
    "email": "...",
    "rol": "admin|profesor|estudiante"
}

BehaviorSubjects
├── AuthService.usuarioSubject: Usuario | null
├── UsuarioService.usuariosSubject: Usuario[]
└── ...

Router State
├── activatedRoute
└── navigationExtras (query params, fragments, etc)
```

## Ciclo de Vida de Componente

```
┌─ CreateComponent ─────────────┐
│  new MyComponent()            │
└───────────────┬───────────────┘
                │
┌───────────────▼───────────────┐
│  OnInit                       │
│  - Cargar datos del servicio  │
│  - Inicializar formularios    │
└───────────────┬───────────────┘
                │
┌───────────────▼───────────────┐
│  OnChanges (si hay inputs)    │
│  - Detectar cambios           │
└───────────────┬───────────────┘
                │
┌───────────────▼───────────────┐
│  OnDestroy (cleanup)          │
│  - Desuscribirse de Observables
│  - Limpiar timers             │
└───────────────┬───────────────┘
                │
┌───────────────▼───────────────┐
│  Componente removido del DOM  │
└─────────────────────────────────┘
```

## Tipología de Rutas

```
Rutas Públicas (sin AuthGuard)
├── /login → LoginComponent
└── / → redirige a /dashboard

Rutas Protegidas por Autenticación (AuthGuard)
├── /dashboard → DashboardComponent
└── /cursos → ListaCursosComponent

Rutas Protegidas por Rol (AuthGuard + RoleGuard)
├── /usuarios → ListaUsuariosComponent (solo admin)
└── /reportes → ListaReportesComponent (admin, profesor)

Lazy Loading (carga bajo demanda)
├── /usuarios/** → usuarios.routes
├── /cursos/** → cursos.routes
├── /reportes/** → reportes.routes
└── /dashboard/** → dashboard.routes
```

## Matriz de Permisos

```
                  Admin  Profesor  Estudiante
Login               ✓       ✓          ✓
Dashboard           ✓       ✓          ✓
Ver Cursos          ✓       ✓          ✓
Crear Curso         ✓       ✓          ✗
Editar Curso        ✓     Propios      ✗
Eliminar Curso      ✓       ✗          ✗
Inscribirse         ✓       ✗          ✓
Gestionar Usuarios  ✓       ✗          ✗
Ver Reportes        ✓       ✓          ✗
Generar Reportes    ✓       ✓          ✗
```

## Performance Optimizations

```
✓ Lazy Loading
  ├─ Cargar módulos bajo demanda
  └─ Reducir bundle inicial

✓ ChangeDetectionStrategy.OnPush
  ├─ Detectar cambios solo cuando es necesario
  └─ Mejorar performance

✓ RxJS Operators
  ├─ takeUntil() → Evitar memory leaks
  ├─ debounceTime() → Reducir llamadas API
  └─ shareReplay() → Cachear resultados

✓ Standalone Components
  ├─ Menos boilerplate
  └─ Mejor tree-shaking

✓ Angular CLI Build Optimization
  ├─ AoT compilation
  ├─ Tree shaking
  └─ Code minification
```

Documentos de referencia relacionados:
- 📖 [README.md](README.md)
- 🚀 [INSTALACION.md](INSTALACION.md)
- 💡 [DESARROLLO.md](DESARROLLO.md)
- ⚡ [REFERENCIA_RAPIDA.md](REFERENCIA_RAPIDA.md)
