import { Directive, Input, ElementRef, OnInit, OnDestroy } from '@angular/core';

/**
 * Directiva personalizada para mostrar estado de carga
 * Uso: <div appLoading [isLoading]="true">Contenido</div>
 */
@Directive({
  selector: '[appLoading]',
  standalone: true
})
export class LoadingDirective implements OnInit, OnDestroy {
  @Input() set appLoading(isLoading: boolean) {
    this.isLoading = isLoading;
    this.updateLoadingState();
  }

  private isLoading: boolean = false;
  private loadingElement: HTMLElement | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.updateLoadingState();
  }

  ngOnDestroy(): void {
    this.removeLoadingIndicator();
  }

  private updateLoadingState(): void {
    if (this.isLoading) {
      this.addLoadingIndicator();
      this.elementRef.nativeElement.style.opacity = '0.6';
      this.elementRef.nativeElement.style.pointerEvents = 'none';
    } else {
      this.removeLoadingIndicator();
      this.elementRef.nativeElement.style.opacity = '1';
      this.elementRef.nativeElement.style.pointerEvents = 'auto';
    }
  }

  private addLoadingIndicator(): void {
    if (!this.loadingElement) {
      this.loadingElement = document.createElement('div');
      this.loadingElement.innerHTML = `
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
        ">
          <div style="
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          "></div>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      `;
      this.elementRef.nativeElement.appendChild(this.loadingElement);
    }
  }

  private removeLoadingIndicator(): void {
    if (this.loadingElement) {
      this.loadingElement.remove();
      this.loadingElement = null;
    }
  }
}
