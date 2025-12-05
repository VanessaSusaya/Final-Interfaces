# 🚀 Guía de Instalación y Ejecución

## Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** (v18 o superior): [Descargar](https://nodejs.org/)
- **npm** (v9 o superior, incluido con Node.js)
- **Angular CLI** (v17 o superior)
- **Git** (opcional, para control de versiones)

## Verificar Instalación

```powershell
# Verificar versiones
node --version          # v18.x.x o superior
npm --version           # v9.x.x o superior
ng version              # Angular CLI version
```

## 📦 Instalación del Proyecto

### Paso 1: Clonar o Descargar el Proyecto

```powershell
# Si tienes Git
git clone <url-del-repositorio>
cd Proyecto_Final

# Si descargaste como ZIP
# Extrae el archivo y navega a la carpeta
cd Proyecto_Final
```

### Paso 2: Instalar Dependencias

```powershell
npm install
```

Esto descargará todas las dependencias especificadas en `package.json` y las guardará en la carpeta `node_modules/`.

⏱️ Esto puede tardar 2-5 minutos dependiendo de tu conexión.

### Paso 3: Configurar Angular CLI (Primera Vez)

```powershell
# Instalar Angular CLI globalmente (si no lo tienes)
npm install -g @angular/cli

# Verificar instalación
ng version
```

## 🏃 Ejecutar la Aplicación

### Opción 1: Servidor de Desarrollo (Recomendado)

```powershell
npm start
```

Este comando:
- Inicia un servidor en `http://localhost:4200`
- Compila la aplicación automáticamente
- Recarga la página al detectar cambios (Hot Module Replacement)
- Muestra errores en tiempo real

**Salida esperada:**
```
✔ Compiled successfully.
Application bundle generated successfully.

Local: http://localhost:4200/
```

### Opción 2: Comando ng serve (Alternativa)

```powershell
ng serve --open

# --open abre automáticamente el navegador
```

### Abrir en el Navegador

Una vez compilado, abre:
```
http://localhost:4200
```

## 🔓 Acceder a la Aplicación

### Página de Login
Se abrirá automáticamente en `/login`

### Credenciales de Prueba

**Administrador:**
- Email: `admin@educativa.com`
- Contraseña: `admin123`

**Profesor:**
- Email: `profesor@educativa.com`
- Contraseña: `profesor123`

**Estudiante:**
- Email: `estudiante@educativa.com`
- Contraseña: `estudiante123`

## 🛑 Detener el Servidor

Presiona `Ctrl + C` en la terminal donde se ejecuta `npm start`

## 🔨 Comandos Útiles

### Desarrollo

```powershell
# Iniciar servidor de desarrollo
npm start

# Watch mode - Compilar al detectar cambios
npm run watch
```

### Compilación

```powershell
# Build para producción
npm run build

# Salida: dist/gestion-educativa/

# Build con análisis de bundle
ng build --stats-json
```

### Testing

```powershell
# Ejecutar tests unitarios
npm test

# Ejecutar tests con coverage
ng test --code-coverage
```

### Lint

```powershell
# Verificar calidad del código
npm run lint
```

## 📁 Estructura Después de Instalación

```
Proyecto_Final/
├── node_modules/          ← Dependencias instaladas
├── src/
│   ├── app/               ← Código fuente
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── dist/                  ← Build para producción (después de npm run build)
├── angular.json           ← Configuración Angular
├── tsconfig.json          ← Configuración TypeScript
├── package.json           ← Dependencias y scripts
└── README.md
```

## ⚠️ Problemas Comunes y Soluciones

### Error: "ng: No se reconoce como comando"

**Solución:**
```powershell
# Instalar Angular CLI globalmente
npm install -g @angular/cli
```

### Error: "Cannot find module 'rxjs'"

**Solución:**
```powershell
# Eliminar node_modules y reinstalar
Remove-Item -Recurse node_modules
npm install
```

### Puerto 4200 ya está en uso

**Solución:**
```powershell
# Usar otro puerto
ng serve --port 4201
```

### Error de permisos en Windows

**Solución:**
```powershell
# Ejecutar PowerShell como Administrador
# Luego:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Los cambios no se reflejan (caché)

**Solución:**
```powershell
# Limpiar caché de Angular
ng cache clean

# O eliminar carpeta .angular
Remove-Item -Recurse .angular
```

### Error: "NodeJs is not compatible with this Angular version"

**Solución:**
```powershell
# Actualizar Node.js a versión LTS
# Descargar de https://nodejs.org/
# La versión actual del proyecto requiere Node.js 18+
```

## 🔧 Configuración por Ambiente

### Desarrollo
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### Producción
```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.tudominio.com/api'
};
```

Para usar configuración de producción:
```powershell
ng serve -c production
```

## 📡 Conectar a Backend

La aplicación espera un backend en `http://localhost:3000/api`

### Endpoints Esperados:

```
POST   /api/auth/login          ← Login
GET    /api/usuarios            ← Listar usuarios
POST   /api/usuarios            ← Crear usuario
PUT    /api/usuarios/{id}       ← Actualizar usuario
DELETE /api/usuarios/{id}       ← Eliminar usuario
GET    /api/cursos              ← Listar cursos
POST   /api/cursos              ← Crear curso
GET    /api/reportes            ← Listar reportes
POST   /api/reportes/generar    ← Generar reporte
```

## 🔄 Recargar la Aplicación

- **Recargar página**: `F5` o `Ctrl + R`
- **Recargar sin caché**: `Ctrl + Shift + R`
- **DevTools**: `F12`

## 📊 Ver Estructura del Proyecto

```powershell
# Mostrar estructura de carpetas (Windows)
tree /F

# O usar comando de PowerShell
Get-ChildItem -Recurse -Depth 3
```

## 💾 Build para Producción

```powershell
# Crear build optimizado
npm run build

# Archivos generados en: dist/gestion-educativa/

# Servir build localmente para probar
npx http-server dist/gestion-educativa -p 8080
```

Acceder en: `http://localhost:8080`

## 🌐 Publicar en Línea

### Opción 1: Netlify (Recomendado)
```powershell
# Instalar Netlify CLI
npm install -g netlify-cli

# Hacer login
netlify login

# Desplegar
netlify deploy --prod --dir dist/gestion-educativa
```

### Opción 2: Firebase
```powershell
# Instalar Firebase CLI
npm install -g firebase-tools

# Configurar proyecto
firebase init

# Desplegar
firebase deploy
```

### Opción 3: Vercel
```powershell
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel
```

## 📚 Documentación Adicional

- 📖 [README.md](README.md) - Descripción del proyecto
- 🏗️ [ARQUITECTURA.md](ARQUITECTURA.md) - Diagramas y flujos
- 💡 [DESARROLLO.md](DESARROLLO.md) - Guía de desarrollo
- ⚡ [REFERENCIA_RAPIDA.md](REFERENCIA_RAPIDA.md) - Referencia rápida

## 🆘 Necesitas Ayuda?

1. Revisa los documentos de la carpeta del proyecto
2. Consulta la [documentación de Angular](https://angular.io)
3. Busca en [Stack Overflow](https://stackoverflow.com)
4. Pregunta en la comunidad de Angular

## ✅ Checklist de Verificación

- [ ] Node.js v18+ instalado
- [ ] npm v9+ instalado
- [ ] Angular CLI v17+ instalado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor iniciado (`npm start`)
- [ ] Aplicación abierta en `http://localhost:4200`
- [ ] Login exitoso con credenciales de prueba
- [ ] Dashboard visible después de login

¡La aplicación está lista para usar! 🎉
