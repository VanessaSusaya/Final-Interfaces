import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../../core/services/usuario.service'
import { Usuario } from '../../../../core/models/usuario';

@Component({
  selector: 'app-detalle-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnInit {
  usuarioForm!: FormGroup;
  usuarioId!: string;
  usuario!: Usuario;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    // 1. Obtener el id de la ruta
    this.usuarioId = this.route.snapshot.paramMap.get('id')!;

    // 2. Cargar el usuario desde el servicio
    this.usuarioService.obtenerUsuarios().subscribe(usuarios => {
      const encontrado = usuarios.find(u => u.id === this.usuarioId);
      if (encontrado) {
        this.usuario = encontrado;
        this.initForm(encontrado);
      }
    });
  }

  // 3. Inicializar el formulario con datos del usuario
  initForm(usuario: Usuario): void {
    this.usuarioForm = this.fb.group({
      nombre: [usuario.nombre, Validators.required],
      apellido: [usuario.apellido, Validators.required],
      email: [usuario.email, [Validators.required, Validators.email]],
      rol: [usuario.rol, Validators.required],
      estado: [usuario.estado]
    });
  }

  // 4. Guardar cambios
  guardar(): void {
    if (this.usuarioForm.valid) {
      const actualizado: Usuario = {
        ...this.usuario,
        ...this.usuarioForm.value,
        fechaActualizacion: new Date()
      };

      // Actualiza directamente en memoria usando el BehaviorSubject
      const lista = this.usuarioService.obtenerUsuariosActuales();
      const index = lista.findIndex(u => u.id === this.usuarioId);
      if (index !== -1) {
        lista[index] = actualizado;
        this.usuarioService.actualizarListaUsuarios([...lista]); // actualiza el subject
      }

      alert('Usuario actualizado correctamente');
      this.router.navigate(['/usuarios']); // volver al listado
    }
  }

  cancelar(): void {
  this.router.navigate(['/usuarios']);
  }

}
