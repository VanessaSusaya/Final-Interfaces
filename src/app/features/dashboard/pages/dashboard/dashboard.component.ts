import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, CursoService, UsuarioService } from '@core/services';
import { Usuario, UserRole, Curso } from '@core/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface Estadistica {
  titulo: string;
  valor: number | string;
  icono: string;
  color: string;
  tendencia?: string;
}

interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  tipo: 'info' | 'warning' | 'success' | 'error';
  fecha: Date;
  leida: boolean;
}

interface ActividadReciente {
  id: string;
  descripcion: string;
  fecha: Date;
  tipo: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  usuario: Usuario | null = null;
  userRole = UserRole;
  estadisticas: Estadistica[] = [];
  notificaciones: Notificacion[] = [];
  actividadesRecientes: ActividadReciente[] = [];
  cursosActivos: Curso[] = [];
  cargandoDatos = true;
  private destroy$ = new Subject<void>();

  // Datos para gráficos
  diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
  actividadSemanal = [12, 19, 15, 25, 18, 10, 8];

  constructor(
    private authService: AuthService,
    private router: Router,
    private cursoService: CursoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.authService.usuario$
      .pipe(takeUntil(this.destroy$))
      .subscribe((usuario: Usuario | null ) => {
        if (usuario) {
          this.usuario = usuario;
          this.cargarDatosSegunRol();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarDatosSegunRol(): void {
    if (this.esAdmin()) {
      this.cargarDatosAdmin();
    } else if (this.esProfesor()) {
      this.cargarDatosProfesor();
    } else if (this.esEstudiante()) {
      this.cargarDatosEstudiante();
    }
  }

  cargarDatosAdmin(): void {
    this.estadisticas = [
      { titulo: 'Usuarios Totales', valor: 145, icono: '👥', color: '#3498db', tendencia: '+12%' },
      { titulo: 'Cursos Activos', valor: 28, icono: '📚', color: '#2ecc71', tendencia: '+5%' },
      { titulo: 'Nuevos Registros', valor: 23, icono: '✨', color: '#e74c3c', tendencia: '+18%' },
      { titulo: 'Tasa de Aprobación', valor: '87%', icono: '📊', color: '#f39c12', tendencia: '+3%' }
    ];

    this.notificaciones = [
      { id: '1', titulo: 'Nuevo registro', mensaje: '5 nuevos estudiantes registrados hoy', tipo: 'info', fecha: new Date(), leida: false },
      { id: '2', titulo: 'Curso completado', mensaje: 'El curso "Angular Avanzado" ha finalizado', tipo: 'success', fecha: new Date(Date.now() - 3600000), leida: false },
      { id: '3', titulo: 'Atención requerida', mensaje: '3 usuarios pendientes de aprobación', tipo: 'warning', fecha: new Date(Date.now() - 7200000), leida: false },
      { id: '4', titulo: 'Mantenimiento programado', mensaje: 'Sistema en mantenimiento el domingo', tipo: 'info', fecha: new Date(Date.now() - 86400000), leida: true }
    ];

    this.actividadesRecientes = [
      { id: '1', descripcion: 'María González se inscribió en "TypeScript Fundamentals"', fecha: new Date(), tipo: 'inscripcion' },
      { id: '2', descripcion: 'Juan Pérez actualizó el curso "RxJS Reactive"', fecha: new Date(Date.now() - 1800000), tipo: 'actualizacion' },
      { id: '3', descripcion: 'Nuevo usuario registrado: Carlos Ruiz', fecha: new Date(Date.now() - 3600000), tipo: 'registro' },
      { id: '4', descripcion: 'Curso "Angular Avanzado" alcanzó 50 estudiantes', fecha: new Date(Date.now() - 7200000), tipo: 'milestone' }
    ];

    this.cargandoDatos = false;
  }

  cargarDatosProfesor(): void {
    this.estadisticas = [
      { titulo: 'Mis Cursos', valor: 4, icono: '📚', color: '#3498db' },
      { titulo: 'Total Estudiantes', valor: 87, icono: '👨‍🎓', color: '#2ecc71' },
      { titulo: 'Tareas Pendientes', valor: 12, icono: '📝', color: '#e74c3c' },
      { titulo: 'Promedio Notas', valor: '8.5', icono: '⭐', color: '#f39c12' }
    ];

    this.notificaciones = [
      { id: '1', titulo: 'Nueva tarea entregada', mensaje: '8 estudiantes entregaron la tarea de Angular', tipo: 'info', fecha: new Date(), leida: false },
      { id: '2', titulo: 'Pregunta en foro', mensaje: 'María preguntó sobre Observables en RxJS', tipo: 'warning', fecha: new Date(Date.now() - 3600000), leida: false },
      { id: '3', titulo: 'Recordatorio', mensaje: 'Calificar tareas de TypeScript (Vence hoy)', tipo: 'warning', fecha: new Date(Date.now() - 7200000), leida: false }
    ];

    this.actividadesRecientes = [
      { id: '1', descripcion: 'Calificaste 15 tareas del curso "Angular Avanzado"', fecha: new Date(), tipo: 'calificacion' },
      { id: '2', descripcion: 'Publicaste nuevo material en "TypeScript Fundamentals"', fecha: new Date(Date.now() - 3600000), tipo: 'publicacion' },
      { id: '3', descripcion: '5 nuevos estudiantes en "RxJS Reactive"', fecha: new Date(Date.now() - 7200000), tipo: 'inscripcion' }
    ];

    this.cursosActivos = [
      { id: '1', nombre: 'Angular Avanzado', descripcion: '28 estudiantes inscritos', profesor: this.usuario?.id || '', duracion: 40, estudiantes: [], estado: true, fechaCreacion: new Date(), fechaActualizacion: new Date() },
      { id: '2', nombre: 'TypeScript Fundamentals', descripcion: '35 estudiantes inscritos', profesor: this.usuario?.id || '', duracion: 30, estudiantes: [], estado: true, fechaCreacion: new Date(), fechaActualizacion: new Date() },
      { id: '3', nombre: 'RxJS Reactive', descripcion: '24 estudiantes inscritos', profesor: this.usuario?.id || '', duracion: 25, estudiantes: [], estado: true, fechaCreacion: new Date(), fechaActualizacion: new Date() }
    ];

    this.cargandoDatos = false;
  }

  cargarDatosEstudiante(): void {
    this.estadisticas = [
      { titulo: 'Cursos Inscritos', valor: 3, icono: '📚', color: '#3498db' },
      { titulo: 'Tareas Completadas', valor: 18, icono: '✅', color: '#2ecc71' },
      { titulo: 'Tareas Pendientes', valor: 5, icono: '⏳', color: '#e74c3c' },
      { titulo: 'Promedio General', valor: '8.7', icono: '🎯', color: '#f39c12' }
    ];

    this.notificaciones = [
      { id: '1', titulo: 'Nueva tarea asignada', mensaje: 'Tarea de Angular: Componentes Reactivos', tipo: 'warning', fecha: new Date(), leida: false },
      { id: '2', titulo: 'Calificación disponible', mensaje: 'Tu tarea de TypeScript fue calificada: 9.0', tipo: 'success', fecha: new Date(Date.now() - 3600000), leida: false },
      { id: '3', titulo: 'Recordatorio', mensaje: 'Clase en vivo de RxJS mañana a las 10:00', tipo: 'info', fecha: new Date(Date.now() - 7200000), leida: false },
      { id: '4', titulo: 'Nuevo material', mensaje: 'Nuevo video disponible en "Angular Avanzado"', tipo: 'info', fecha: new Date(Date.now() - 86400000), leida: true }
    ];

    this.actividadesRecientes = [
      { id: '1', descripcion: 'Completaste la tarea "Servicios en Angular"', fecha: new Date(), tipo: 'completado' },
      { id: '2', descripcion: 'Viste el video "Introducción a RxJS"', fecha: new Date(Date.now() - 3600000), tipo: 'video' },
      { id: '3', descripcion: 'Participaste en el foro de TypeScript', fecha: new Date(Date.now() - 7200000), tipo: 'foro' }
    ];

    this.cursosActivos = [
      { id: '1', nombre: 'Angular Avanzado', descripcion: 'Progreso: 65%', profesor: '2', duracion: 40, estudiantes: [], estado: true, fechaCreacion: new Date(), fechaActualizacion: new Date() },
      { id: '2', nombre: 'TypeScript Fundamentals', descripcion: 'Progreso: 80%', profesor: '2', duracion: 30, estudiantes: [], estado: true, fechaCreacion: new Date(), fechaActualizacion: new Date() },
      { id: '3', nombre: 'RxJS Reactive', descripcion: 'Progreso: 45%', profesor: '2', duracion: 25, estudiantes: [], estado: true, fechaCreacion: new Date(), fechaActualizacion: new Date() }
    ];

    this.cargandoDatos = false;
  }

  marcarNotificacionLeida(id: string): void {
    const notif = this.notificaciones.find(n => n.id === id);
    if (notif) {
      notif.leida = true;
    }
  }

  get notificacionesSinLeer(): number {
    return this.notificaciones.filter(n => !n.leida).length;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  esAdmin(): boolean {
    if (!this.usuario) return false;
    const rol = this.usuario.rol as string;
    return rol === 'admin' || rol === UserRole.ADMIN;
  }

  esProfesor(): boolean {
    if (!this.usuario) return false;
    const rol = this.usuario.rol as string;
    return rol === 'profesor' || rol === UserRole.TEACHER;
  }

  esEstudiante(): boolean {
    if (!this.usuario) return false;
    const rol = this.usuario.rol as string;
    return rol === 'estudiante' || rol === UserRole.STUDENT;
  }

  getTiempoTranscurrido(fecha: Date): string {
    const ahora = new Date().getTime();
    const diferencia = ahora - fecha.getTime();
    const minutos = Math.floor(diferencia / 60000);
    const horas = Math.floor(diferencia / 3600000);
    const dias = Math.floor(diferencia / 86400000);

    if (minutos < 1) return 'Hace un momento';
    if (minutos < 60) return `Hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
    if (horas < 24) return `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
    return `Hace ${dias} día${dias > 1 ? 's' : ''}`;
  }
}

