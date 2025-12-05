import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { JwtInterceptor, ErrorInterceptor } from '@core/interceptors';

/**
 * Configuración de la aplicación Angular
 * Define:
 * - Rutas de la aplicación
 * - Cliente HTTP con interceptores
 * - Animaciones
 * - Interceptores de JWT y manejo de errores
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Enrutamiento
    provideRouter(routes),

    // Animaciones
    provideAnimations(),

    // Cliente HTTP
    provideHttpClient(),

    // Interceptor JWT - Adjunta el token a todas las peticiones
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },

    // Interceptor de errores - Manejo centralizado de errores HTTP
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
};
