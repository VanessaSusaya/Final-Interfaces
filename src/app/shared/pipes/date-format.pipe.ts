import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Pipe personalizado para formatear fechas
 * Uso: {{ fecha | appDateFormat:'long' }}
 * Formatos soportados: 'short', 'medium', 'long', 'full'
 */
@Pipe({
  name: 'appDateFormat',
  standalone: true
})
@Injectable()
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string, format: string = 'medium'): string {
    if (!value) {
      return '';
    }

    const date = typeof value === 'string' ? new Date(value) : value;

    if (isNaN(date.getTime())) {
      return '';
    }

    const options: Intl.DateTimeFormatOptions = {
      short: { year: 'numeric', month: 'numeric', day: 'numeric' },
      medium: { year: 'numeric', month: 'short', day: 'numeric' },
      long: { year: 'numeric', month: 'long', day: 'numeric' },
      full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
    }[format] as Intl.DateTimeFormatOptions;

    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }
}
