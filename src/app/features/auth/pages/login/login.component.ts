import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  cargando = false;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  private inicializarFormulario(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  realizar_login(): void {
    if (this.loginForm.invalid) {
      this.error = 'Por favor completa todos los campos correctamente';
      return;
    }

    this.cargando = true;
    this.error = null;

    console.log('🚀 Iniciando login con:', this.loginForm.value.email);

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('✅ Login response recibido:', response);
        this.cargando = false;
        console.log('🔀 Navegando a /dashboard...');
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('❌ Error de login:', err);
        this.cargando = false;
        
        // Extraer mensaje de error de diferentes formatos
        let mensaje = 'Error en el login. Verifica tus credenciales.';
        
        if (err?.error?.message) {
          mensaje = err.error.message;
        } else if (err?.message) {
          mensaje = err.message;
        } else if (typeof err === 'string') {
          mensaje = err;
        }
        
        console.log('💬 Mensaje de error mostrado:', mensaje);
        this.error = mensaje;
      },
      complete: () => {
        console.log('✔️ Observable completado');
      }
    });
  }
}
