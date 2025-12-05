# 🚀 INICIO RÁPIDO - Checklist

## ✅ Pre-requisitos

- [ ] Node.js v18+ instalado
- [ ] npm v9+ instalado
- [ ] VS Code o editor favorito abierto
- [ ] Acceso a terminal/PowerShell
- [ ] Conexión a internet para descargar dependencias

## 📦 Instalación Inicial

```powershell
# 1. Abrir PowerShell en la carpeta del proyecto
cd "C:\Desarrollo de Interfaces 3\Proyecto_Final"

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm start

# 4. Abrir navegador en http://localhost:4200
```

## 🔓 Login Rápido

Copia una de estas credenciales y pégalas en el formulario:

### Admin
```
Email: admin@educativa.com
Contraseña: admin123
```

### Profesor
```
Email: profesor@educativa.com
Contraseña: profesor123
```

### Estudiante
```
Email: estudiante@educativa.com
Contraseña: estudiante123
```

## 📂 Estructura Principal

```
src/
├── app/core/            ← Servicios, guards, modelos
├── app/features/        ← Módulos (auth, dashboard, usuarios, cursos, reportes)
├── app/shared/          ← Componentes compartidos
├── main.ts              ← Punto de entrada
└── index.html           ← HTML principal
```

## 🎯 Rutas Principales

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `/login` | Iniciar sesión | Público |
| `/dashboard` | Panel principal | Autenticado |
| `/usuarios` | Gestionar usuarios | Admin |
| `/cursos` | Ver/gestionar cursos | Todos autenticados |
| `/reportes` | Generar reportes | Admin, Profesor |

## 💡 Primeros Comandos

```powershell
# Iniciar servidor (con auto-reload)
npm start

# Build para producción
npm run build

# Watch mode
npm run watch

# Ejecutar tests
npm test

# Lint del código
npm run lint
```

## 📖 Documentación Disponible

1. 📚 **[README.md](README.md)** - Descripción general del proyecto
2. 🚀 **[INSTALACION.md](INSTALACION.md)** - Guía de instalación detallada
3. 🏗️ **[ARQUITECTURA.md](ARQUITECTURA.md)** - Diagramas y flujos
4. 💡 **[DESARROLLO.md](DESARROLLO.md)** - Guía completa de desarrollo
5. ⚡ **[REFERENCIA_RAPIDA.md](REFERENCIA_RAPIDA.md)** - Snippets de código
6. 📡 **[API_SPEC.md](API_SPEC.md)** - Especificación de API
7. 📊 **[ESTRUCTURA.md](ESTRUCTURA.md)** - Árbol de carpetas
8. ✅ **[RESUMEN.md](RESUMEN.md)** - Resumen del proyecto

## 🔐 ¿Cómo Funciona la Seguridad?

```
1. Usuario hace login
   └─> Entra email/contraseña

2. AuthService comunica con API
   └─> Recibe JWT token

3. Token se almacena en localStorage
   └─> Se incluye en todas las peticiones

4. Guards protegen rutas
   └─> AuthGuard: ¿Token válido?
   └─> RoleGuard: ¿Tiene el rol requerido?

5. JwtInterceptor añade token automáticamente
   └─> Header: Authorization: Bearer {token}

6. Si token expira
   └─> Error 401
   └─> Logout automático
   └─> Redireccionar a /login
```

## 🛠️ Archivos Principales

### Backend (No incluido, pero necesario)
- Servidor en `http://localhost:3000`
- Endpoints en `/api/*`
- Ver [API_SPEC.md](API_SPEC.md) para detalles

### Frontend (Lo que se creó)
- Servidor en `http://localhost:4200`
- Compilación automática con `npm start`
- Hot reload de cambios

## ❓ Preguntas Frecuentes

### ¿Por qué dice "Cannot GET /"?
```
R: El servidor está en /login, no en /
Solución: Ir a http://localhost:4200/login
```

### ¿Cómo conecto a una API real?
```
R: Cambiar URL en src/environments/environment.ts
De: http://localhost:3000/api
A: https://tu-api.com/api
```

### ¿Qué rol tengo después de login?
```
R: Depende de la credencial:
- admin@educativa.com → Admin
- profesor@educativa.com → Profesor
- estudiante@educativa.com → Estudiante
```

### ¿Puedo cambiar las credenciales?
```
R: Las credenciales son simuladas del backend
Para cambiarlas, modificar la API simulada o
conectar a un backend real
```

## 🚦 Troubleshooting Rápido

### Error: "ng: No se reconoce como comando"
```powershell
npm install -g @angular/cli
```

### Puerto 4200 ocupado
```powershell
ng serve --port 4201
```

### Limpiar caché
```powershell
ng cache clean
Remove-Item -Recurse .angular
```

### Reinstalar dependencias
```powershell
Remove-Item -Recurse node_modules
npm install
```

## 📝 Notas de Desarrollo

- Los componentes usan **standalone** (Angular 17+)
- Lazy loading en todas las rutas
- Path aliases configurados (`@core`, `@features`, etc)
- RxJS para estado reactivo
- TypeScript con tipos estrictos

## 🎯 Próximas Tareas (Para Desarrollo)

- [ ] Conectar a backend real
- [ ] Agregar validación mejorada
- [ ] Implementar paginación
- [ ] Agregar filtros en tablas
- [ ] Mejorar estilos
- [ ] Agregar tests unitarios
- [ ] Agregar animaciones
- [ ] Responsive design completo

## 📞 Contacto y Soporte

Para preguntas sobre:
- **Instalación**: Ver [INSTALACION.md](INSTALACION.md)
- **Desarrollo**: Ver [DESARROLLO.md](DESARROLLO.md)
- **API**: Ver [API_SPEC.md](API_SPEC.md)
- **Código**: Ver [REFERENCIA_RAPIDA.md](REFERENCIA_RAPIDA.md)

## ✨ Tips Profesionales

1. **DevTools**: Abre F12 para ver logs y errores
2. **Network**: Inspecciona peticiones HTTP
3. **Storage**: Mira tokens en localStorage
4. **Console**: Usa `console.log()` para debug
5. **Breakpoints**: Pausa ejecución en Sources

## 🎓 Para Presentar el Proyecto

```markdown
1. Mostrar estructura de carpetas
   └─ Explicar core, features, shared

2. Hacer login
   └─ Mostrar dashboard según rol

3. Acceder a usuarios (admin)
   └─ Mostrar tabla con CRUD

4. Acceder a cursos
   └─ Mostrar grid responsivo

5. Generar reportes
   └─ Mostrar descarga PDF

6. Inspeccionar network
   └─ Mostrar JWT en headers

7. Abrir código fuente
   └─ Explicar guards y servicios
```

## 🎉 ¡Listo!

Todo está configurado y listo para:
✅ Empezar a desarrollar
✅ Conectar a API real
✅ Hacer la presentación técnica
✅ Continuar el proyecto

---

**Estado**: ✅ COMPLETADO
**Versión**: 1.0.0
**Fecha**: 4 de diciembre de 2024
