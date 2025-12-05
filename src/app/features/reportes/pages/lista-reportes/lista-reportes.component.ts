import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteService } from '@core/services';
import { Reporte } from '@core/models';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lista-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-reportes.component.html',
  styleUrls: ['./lista-reportes.component.scss']
})
export class ListaReportesComponent implements OnInit, OnDestroy {
  reportes: Reporte[] = [];
  cargando = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(private reporteService: ReporteService) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private cargarReportes(): void {
    this.reporteService.obtenerReportes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (reportes) => {
          this.reportes = reportes;
        },
        error: (err) => {
          this.error = 'Error al cargar reportes';
          console.error(err);
        }
      });
  }

  generarReporteUsuarios(): void {
    this.cargando = true;
    this.reporteService.generarReporteUsuarios()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (reporte) => {
          this.reportes.unshift(reporte);
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'Error al generar reporte';
          this.cargando = false;
        }
      });
  }

  generarReporteCursos(): void {
    this.cargando = true;
    this.reporteService.generarReporteCursos()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (reporte) => {
          this.reportes.unshift(reporte);
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'Error al generar reporte';
          this.cargando = false;
        }
      });
  }

  descargar(id: string): void {
    this.reporteService.descargarReportePDF(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `reporte-${id}.pdf`;
          a.click();
          window.URL.revokeObjectURL(url);
        },
        error: (err) => {
          this.error = 'Error al descargar reporte';
        }
      });
  }
}
