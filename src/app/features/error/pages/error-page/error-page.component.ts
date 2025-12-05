import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  template: `
    <div class="error-container">
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <button (click)="irAlInicio()">Volver al inicio</button>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
    }
    h1 {
      font-size: 3rem;
      margin-bottom: 20px;
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 30px;
    }
    button {
      padding: 12px 30px;
      font-size: 1rem;
      background: white;
      color: #667eea;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }
    button:hover {
      background: #f0f0f0;
    }
  `]
})
export class ErrorPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('Error page loaded');
  }

  irAlInicio(): void {
    this.router.navigate(['/']);
  }
}
