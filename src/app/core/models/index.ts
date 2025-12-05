// Roles disponibles en el sistema
export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'profesor',
  STUDENT = 'estudiante'
}

// Modelo de Usuario
export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: UserRole | 'admin' | 'profesor' | 'estudiante';
  estado: boolean;
  activo?: boolean;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

// Modelo de Curso
export interface Curso {
  id: string;
  nombre: string;
  descripcion: string;
  profesor?: string;
  profesor_id?: string;
  duracion?: number;
  capacidad?: number;
  estudiantes?: any[];
  estudiantes_inscritos?: number;
  estado?: boolean;
  activo?: boolean;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}

// Modelo de Login
export interface LoginRequest {
  email: string;
  password: string;
}

// Modelo de Respuesta de Login
export interface LoginResponse {
  token: string;
  usuario: Usuario;
}

// Modelo para JWT Payload
export interface JwtPayload {
  sub: string;
  email: string;
  rol: UserRole | string;
  iat: number;
  exp: number;
}

// Modelo de Reporte
export interface Reporte {
  id: string;
  titulo?: string;
  tipo: 'usuarios' | 'cursos' | 'inscripciones';
  datos?: any[];
  descripcion?: string;
  fechaGeneracion: Date;
  generadoPor?: string;
  estado?: 'completado' | 'pendiente' | 'error';
  descargas?: number;
  formato?: 'pdf' | 'excel' | 'csv';
}
