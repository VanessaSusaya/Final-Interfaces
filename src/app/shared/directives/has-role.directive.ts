import { Directive, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';

/**
 * Directiva personalizada para verificar roles
 * Oculta elementos si el usuario no tiene el rol requerido
 * Uso: <div *appHasRole="'admin'">Solo admin</div>
 */
@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective implements OnInit {
  @Input() set appHasRole(roles: string | string[]) {
    this.requiredRoles = Array.isArray(roles) ? roles : [roles];
    this.updateView();
  }

  private requiredRoles: string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateView();
  }

  private updateView(): void {
    const userRole = this.authService.obtenerRolActual();

    if (userRole && this.requiredRoles.includes(userRole)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
