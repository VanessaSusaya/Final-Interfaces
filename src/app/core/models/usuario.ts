export interface Usuario {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    rol: 'admin' | 'profesor' | 'estudiante';
    estado: boolean;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}
