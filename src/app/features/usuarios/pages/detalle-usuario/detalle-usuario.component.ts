import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-detalle-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  template: `<div>Detalle Usuario</div>`
})
export class DestalleUsuarioComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Implementar detalle
  }
}
