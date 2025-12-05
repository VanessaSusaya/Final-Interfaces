import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '@core/services';
import { Usuario } from '@core/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit, OnDestroy {
  usuarios: Usuario[] = [];
  cargando = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (usuarios) => {
          this.usuarios = usuarios;
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'Error al cargar usuarios';
          this.cargando = false;
          console.error(err);
        }
      });
  }

  eliminarUsuario(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.usuarios = this.usuarios.filter(u => u.id !== id);
          },
          error: (err) => {
            this.error = 'Error al eliminar usuario';
            console.error(err);
          }
        });
    }
  }
}
