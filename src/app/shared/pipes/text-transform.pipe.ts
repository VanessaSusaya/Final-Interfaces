import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Pipe personalizado para formatear texto
 * Uso: {{ texto | appTextTransform:'uppercase' }}
 * Transformaciones: 'uppercase', 'lowercase', 'capitalize', 'reverse'
 */
@Pipe({
  name: 'appTextTransform',
  standalone: true
})
@Injectable()
export class TextTransformPipe implements PipeTransform {
  transform(value: string, transform: string = 'capitalize'): string {
    if (!value) {
      return '';
    }

    switch (transform.toLowerCase()) {
      case 'uppercase':
        return value.toUpperCase();

      case 'lowercase':
        return value.toLowerCase();

      case 'capitalize':
        return value
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');

      case 'reverse':
        return value.split('').reverse().join('');

      default:
        return value;
    }
  }
}
