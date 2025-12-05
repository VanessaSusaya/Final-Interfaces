import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Pipe personalizado para HTML seguro
 * Evita sanitización de HTML confiable
 * Uso: {{ html | appSafeHtml }}
 */
@Pipe({
  name: 'appSafeHtml',
  standalone: true
})
@Injectable()
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) {
      return '';
    }
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
