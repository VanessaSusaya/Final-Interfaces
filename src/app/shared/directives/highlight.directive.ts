import { Directive, ElementRef, Input, OnInit } from '@angular/core';

/**
 * Directiva personalizada para resaltar elementos
 * Uso: <div appHighlight="yellow">Contenido</div>
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string = 'yellow';
  @Input() highlightTextColor: string = 'black';

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.elementRef.nativeElement.style.backgroundColor = this.appHighlight;
    this.elementRef.nativeElement.style.color = this.highlightTextColor;
    this.elementRef.nativeElement.style.padding = '5px';
    this.elementRef.nativeElement.style.borderRadius = '4px';
  }
}
