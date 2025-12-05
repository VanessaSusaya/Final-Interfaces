```mermaid
graph TD
    A[Usuario] -->|Login| B[Componente Login]
    B -->|Credenciales| C[AuthService]
    C -->|Petición POST| D[API Backend]
    D -->|JWT Token + Usuario| C
    C -->|Guardar Token| E[localStorage]
    C -->|Emitir Usuario| F[BehaviorSubject]
    
    A -->|Navegar a Ruta| G{AuthGuard?}
    G -->|¿Token Válido?| H{Sí}
    G -->|No| I[Redireccionar a Login]
    
    H -->|Sí| J{RoleGuard?}
    J -->|¿Rol Autorizado?| K{Sí}
    K -->|Sí| L[Permitir Acceso]
    K -->|No| M[Redireccionar a Dashboard]
    
    L -->|Petición HTTP| N[JwtInterceptor]
    N -->|Añade Bearer Token| O[Encabezado Authorization]
    O -->|Envía| D
    
    D -->|Response| N
    N -->|¿401 Unauthorized?| P{Sí}
    P -->|Sí| Q[Logout y Redireccionar]
    P -->|No| R[Devolver Response]
    
    style A fill:#e1f5ff
    style B fill:#fff9c4
    style C fill:#f3e5f5
    style D fill:#e8f5e9
    style L fill:#c8e6c9
    style I fill:#ffcdd2
    style M fill:#ffcdd2
    style Q fill:#ffcdd2
```

## Flujo de Autenticación y Autorización

### 1. Login
```
Usuario → Login Component → AuthService → API
API → JWT Token + Usuario Data → AuthService
AuthService → Guardar Token (localStorage)
AuthService → Guardar Usuario (localStorage + BehaviorSubject)
```

### 2. Protección de Rutas
```
Navegación a Ruta → AuthGuard
AuthGuard → ¿Token válido y no expirado?
  ✅ Sí → Continuar a RoleGuard
  ❌ No → Redireccionar a /login
```

### 3. Validación de Roles
```
RoleGuard → ¿Rol del usuario incluido en roles requeridos?
  ✅ Sí → Permitir acceso a ruta
  ❌ No → Redireccionar a /dashboard
```

### 4. Peticiones HTTP Autenticadas
```
Petición HTTP → JwtInterceptor
JwtInterceptor → ¿Existe token?
  ✅ Sí → Añadir header: Authorization: Bearer {token}
  ❌ No → Enviar sin token
  
Response → ¿Status 401?
  ✅ Sí → Logout y redireccionar a /login
  ❌ No → Devolver datos
```

## Decodificación de JWT

El token JWT está compuesto por 3 partes separadas por puntos:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwicm9sIjoiYWRtaW4iLCJpYXQiOjE2NzAwMDAwMDAsImV4cCI6MTY3MDAwMzYwMH0.
TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

**Parte 1 (Header)**: Algoritmo y tipo
**Parte 2 (Payload)**: Datos del usuario (decodificados con Base64)
**Parte 3 (Firma)**: Verificación del servidor

## Almacenamiento de Datos

### localStorage
```javascript
localStorage.setItem('auth_token', 'eyJhbGc...')      // Token JWT
localStorage.setItem('usuario', JSON.stringify({       // Datos usuario
  id: '123',
  nombre: 'Juan Pérez',
  email: 'juan@educativa.com',
  rol: 'admin'
}))
```

## Ciclo de Vida de Sesión

1. **Inicio**: Usuario hace login
2. **Activo**: Token en localStorage, peticiones autenticadas
3. **Expiración**: Token vence (exp: timestamp)
4. **Inactividad**: Sesión expira después de inactividad
5. **Logout**: Usuario cierra sesión manualmente
6. **Limpieza**: Token y usuario eliminados, redirección a login
