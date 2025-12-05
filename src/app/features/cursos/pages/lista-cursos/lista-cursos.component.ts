import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CursoService } from '@core/services';
import { Curso } from '@core/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.scss']
})
export class ListaCursosComponent implements OnInit, OnDestroy {
  cursos: Curso[] = [];
  cargando = true;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private cursoService: CursoService) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarCursos(): void {
    this.cursoService.obtenerCursos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (cursos) => {
          this.cursos = cursos;
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'Error al cargar cursos';
          this.cargando = false;
          console.error(err);
        }
      });
  }

  eliminarCurso(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
      this.cursoService.eliminarCurso(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.cursos = this.cursos.filter(c => c.id !== id);
          },
          error: (err) => {
            this.error = 'Error al eliminar curso';
            console.error(err);
          }
        });
    }
  }
}
