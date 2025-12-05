# 📡 Especificación de API - Sistema de Gestión Educativa

## Base URL
```
http://localhost:3000/api
```

## Headers Comunes
```
Content-Type: application/json
Authorization: Bearer {token_jwt}
```

## Modelos de Datos

### Usuario
```json
{
  "id": "uuid",
  "nombre": "string",
  "email": "string",
  "rol": "admin|profesor|estudiante",
  "activo": boolean,
  "fechaCreacion": "ISO 8601 datetime",
  "fechaActualizacion": "ISO 8601 datetime"
}
```

### Curso
```json
{
  "id": "uuid",
  "nombre": "string",
  "descripcion": "string",
  "profesor_id": "uuid",
  "capacidad": number,
  "estudiantes_inscritos": number,
  "activo": boolean,
  "fechaCreacion": "ISO 8601 datetime",
  "fechaActualizacion": "ISO 8601 datetime"
}
```

### Reporte
```json
{
  "id": "uuid",
  "titulo": "string",
  "tipo": "usuarios|cursos|inscripciones",
  "datos": [{}],
  "fechaGeneracion": "ISO 8601 datetime",
  "generadoPor": "string"
}
```

## Endpoints

### 🔐 Autenticación

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@educativa.com",
  "password": "admin123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": "user-001",
    "nombre": "Juan Administrador",
    "email": "admin@educativa.com",
    "rol": "admin",
    "activo": true,
    "fechaCreacion": "2024-01-01T10:00:00Z",
    "fechaActualizacion": "2024-01-01T10:00:00Z"
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "message": "Credenciales inválidas"
}
```

---

### 👥 Usuarios

#### Listar Usuarios
```http
GET /usuarios
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
[
  {
    "id": "user-001",
    "nombre": "Juan Administrador",
    "email": "admin@educativa.com",
    "rol": "admin",
    "activo": true,
    "fechaCreacion": "2024-01-01T10:00:00Z",
    "fechaActualizacion": "2024-01-01T10:00:00Z"
  },
  {
    "id": "user-002",
    "nombre": "María Profesor",
    "email": "profesor@educativa.com",
    "rol": "profesor",
    "activo": true,
    "fechaCreacion": "2024-01-02T10:00:00Z",
    "fechaActualizacion": "2024-01-02T10:00:00Z"
  }
]
```

#### Filtrar por Rol
```http
GET /usuarios?rol=profesor
Authorization: Bearer {token}
```

#### Obtener Usuario por ID
```http
GET /usuarios/:id
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "id": "user-001",
  "nombre": "Juan Administrador",
  "email": "admin@educativa.com",
  "rol": "admin",
  "activo": true,
  "fechaCreacion": "2024-01-01T10:00:00Z",
  "fechaActualizacion": "2024-01-01T10:00:00Z"
}
```

#### Crear Usuario
```http
POST /usuarios
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Nuevo Usuario",
  "email": "nuevo@educativa.com",
  "password": "contraseña123",
  "rol": "estudiante",
  "activo": true
}
```

**Response (201 Created):**
```json
{
  "id": "user-004",
  "nombre": "Nuevo Usuario",
  "email": "nuevo@educativa.com",
  "rol": "estudiante",
  "activo": true,
  "fechaCreacion": "2024-12-04T15:30:00Z",
  "fechaActualizacion": "2024-12-04T15:30:00Z"
}
```

#### Actualizar Usuario
```http
PUT /usuarios/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "Usuario Actualizado",
  "activo": false
}
```

**Response (200 OK):**
```json
{
  "id": "user-001",
  "nombre": "Usuario Actualizado",
  "email": "admin@educativa.com",
  "rol": "admin",
  "activo": false,
  "fechaCreacion": "2024-01-01T10:00:00Z",
  "fechaActualizacion": "2024-12-04T15:35:00Z"
}
```

#### Eliminar Usuario
```http
DELETE /usuarios/:id
Authorization: Bearer {token}
```

**Response (204 No Content):**
```
(sin contenido)
```

---

### 📚 Cursos

#### Listar Cursos
```http
GET /cursos
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
[
  {
    "id": "curso-001",
    "nombre": "Programación en Angular",
    "descripcion": "Aprende Angular desde cero",
    "profesor_id": "user-002",
    "capacidad": 30,
    "estudiantes_inscritos": 15,
    "activo": true,
    "fechaCreacion": "2024-01-05T09:00:00Z",
    "fechaActualizacion": "2024-12-04T10:00:00Z"
  }
]
```

#### Filtrar Cursos por Profesor
```http
GET /cursos?profesor_id=user-002
Authorization: Bearer {token}
```

#### Obtener Curso por ID
```http
GET /cursos/:id
Authorization: Bearer {token}
```

#### Crear Curso
```http
POST /cursos
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "TypeScript Avanzado",
  "descripcion": "Domina TypeScript en profundidad",
  "profesor_id": "user-002",
  "capacidad": 25,
  "activo": true
}
```

**Response (201 Created):**
```json
{
  "id": "curso-005",
  "nombre": "TypeScript Avanzado",
  "descripcion": "Domina TypeScript en profundidad",
  "profesor_id": "user-002",
  "capacidad": 25,
  "estudiantes_inscritos": 0,
  "activo": true,
  "fechaCreacion": "2024-12-04T16:00:00Z",
  "fechaActualizacion": "2024-12-04T16:00:00Z"
}
```

#### Actualizar Curso
```http
PUT /cursos/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "nombre": "TypeScript Avanzado 2024",
  "capacidad": 35
}
```

#### Eliminar Curso
```http
DELETE /cursos/:id
Authorization: Bearer {token}
```

#### Inscribir Estudiante
```http
POST /cursos/:id/inscribir
Authorization: Bearer {token}
Content-Type: application/json

{
  "estudiante_id": "user-003"
}
```

**Response (200 OK):**
```json
{
  "id": "curso-001",
  "nombre": "Programación en Angular",
  "descripcion": "Aprende Angular desde cero",
  "profesor_id": "user-002",
  "capacidad": 30,
  "estudiantes_inscritos": 16,
  "activo": true,
  "fechaCreacion": "2024-01-05T09:00:00Z",
  "fechaActualizacion": "2024-12-04T16:05:00Z"
}
```

#### Retirar Estudiante
```http
POST /cursos/:id/retirar
Authorization: Bearer {token}
Content-Type: application/json

{
  "estudiante_id": "user-003"
}
```

---

### 📊 Reportes

#### Listar Reportes
```http
GET /reportes
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
[
  {
    "id": "reporte-001",
    "titulo": "Reporte de Usuarios - 2024-12-04",
    "tipo": "usuarios",
    "datos": [
      {
        "total": 50,
        "activos": 45,
        "inactivos": 5,
        "por_rol": {
          "admin": 5,
          "profesor": 10,
          "estudiante": 35
        }
      }
    ],
    "fechaGeneracion": "2024-12-04T14:00:00Z",
    "generadoPor": "admin@educativa.com"
  }
]
```

#### Obtener Reporte por ID
```http
GET /reportes/:id
Authorization: Bearer {token}
```

#### Generar Nuevo Reporte
```http
POST /reportes/generar
Authorization: Bearer {token}
Content-Type: application/json

{
  "tipo": "usuarios"
}
```

**Response (201 Created):**
```json
{
  "id": "reporte-002",
  "titulo": "Reporte de Usuarios - 2024-12-04",
  "tipo": "usuarios",
  "datos": [
    {
      "total": 50,
      "activos": 45,
      "inactivos": 5,
      "por_rol": {
        "admin": 5,
        "profesor": 10,
        "estudiante": 35
      }
    }
  ],
  "fechaGeneracion": "2024-12-04T16:10:00Z",
  "generadoPor": "admin@educativa.com"
}
```

#### Descargar Reporte en PDF
```http
GET /reportes/:id/descargar
Authorization: Bearer {token}

Response: application/pdf (archivo binario)
```

---

## Códigos de Respuesta HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Solicitud exitosa sin contenido |
| 400 | Bad Request - Solicitud inválida |
| 401 | Unauthorized - Autenticación requerida |
| 403 | Forbidden - Acceso denegado |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Conflicto (ej: email duplicado) |
| 500 | Internal Server Error - Error del servidor |

## Estructura de Errores

```json
{
  "statusCode": 400,
  "message": "Descripción del error",
  "errors": [
    {
      "field": "email",
      "message": "El email ya existe"
    }
  ]
}
```

## JWT Token

### Estructura
```
Header.Payload.Signature

Header:
{
  "alg": "HS256",
  "typ": "JWT"
}

Payload:
{
  "sub": "user-001",
  "email": "admin@educativa.com",
  "rol": "admin",
  "iat": 1670000000,
  "exp": 1670003600
}

Signature:
HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

### Validez
- El token es válido por **1 hora** por defecto
- Se incluye en el header `Authorization: Bearer {token}`
- Si expira, devuelve error **401 Unauthorized**

## Tasa de Límite (Rate Limiting)

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1670087000
```

## CORS

La API debe permitir:
- Origin: `http://localhost:4200` (desarrollo)
- Methods: `GET, POST, PUT, DELETE, OPTIONS`
- Headers: `Content-Type, Authorization`

## Paginación (Opcional)

```http
GET /usuarios?page=1&limit=10&sort=nombre&order=asc
```

**Response Headers:**
```
X-Total-Count: 50
X-Page-Count: 5
X-Current-Page: 1
X-Per-Page: 10
```

## Ejemplo de Integración (Frontend)

```typescript
// src/app/core/services/auth.service.ts
login(credenciales: LoginRequest): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(
    `${this.apiUrl}/auth/login`,
    credenciales
  ).pipe(
    tap(response => {
      this.guardarToken(response.token);
      this.usuarioSubject.next(response.usuario);
    })
  );
}
```

---

## Mock de Respuestas (Para Desarrollo)

Si el backend no está disponible, puedes usar `HttpClientTestingModule` o un servicio mock:

```typescript
// En environment de desarrollo
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  useMockData: true  // Para usar datos simulados
};
```

## Postman Collection

Descarga la colección de Postman para probar los endpoints:
[Link a colección JSON]

## Documentación Interactiva

Accede a Swagger/OpenAPI:
```
http://localhost:3000/api/docs
```
