import { Directive, Input, HostListener, ElementRef } from '@angular/core';

/**
 * Directiva personalizada para deshabilitar mientras se carga
 * Uso: <button appDisableOnLoad [disableOnLoad]="isLoading">Enviar</button>
 */
@Directive({
  selector: '[appDisableOnLoad]',
  standalone: true
})
export class DisableOnLoadDirective {
  @Input() set appDisableOnLoad(isLoading: boolean) {
    if (isLoading) {
      this.elementRef.nativeElement.disabled = true;
      this.elementRef.nativeElement.style.opacity = '0.5';
      this.elementRef.nativeElement.style.cursor = 'not-allowed';
    } else {
      this.elementRef.nativeElement.disabled = false;
      this.elementRef.nativeElement.style.opacity = '1';
      this.elementRef.nativeElement.style.cursor = 'pointer';
    }
  }

  constructor(private elementRef: ElementRef) {}

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    if (this.elementRef.nativeElement.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
