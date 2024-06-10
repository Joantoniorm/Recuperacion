import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TrabajoService} from "../../../services/trabajos/trabajo.service";
import {Revision} from "../../../modelos/trabajo";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-revisiones-create',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf
    ],
  templateUrl: './revisiones-create.component.html',
  styleUrl: './revisiones-create.component.css'
})
export class RevisionesCreateComponent {
  revisionForm: FormGroup;
  trabajoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private trabajoService: TrabajoService
  ) {
    this.revisionForm = this.fb.group({
      fecha: ['', [Validators.required, this.fechaActualValidator()]], // Agregar validador personalizado
      comentarios: ['', Validators.required],
      finalizada: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.trabajoId = Number(this.route.snapshot.paramMap.get('id'));
  }

  onSubmit(): void {
      if (this.revisionForm.valid && this.trabajoId) {
          // Obtener el valor del campo de comentarios
          let comentarios = this.revisionForm.value.comentarios;

          // Convertir el valor del campo de comentarios a un array si es un string
          if (typeof comentarios === 'string') {
              comentarios = [comentarios];
          }

          // Crear la nueva revisión con el valor actualizado del campo de comentarios
          const nuevaRevision: Revision = {
              id: 0, // Aquí inicializamos el id como 0 temporalmente, se asignará el valor correcto en el servicio
              fecha: this.revisionForm.value.fecha,
              comentarios: comentarios,
              finalizada: this.revisionForm.value.finalizada
          };

          // Agregar la nueva revisión utilizando el servicio
          this.trabajoService.addRevision(this.trabajoId, nuevaRevision);

          // Navegar de regreso a la página de trabajos
          this.router.navigate(['/trabajos']);
      }
  }

  // Función para crear un validador personalizado que verifica que la fecha no sea anterior a la actual
  fechaActualValidator() {
    return (control:AbstractControl) => {
      const fechaSeleccionada = control.value;
      const fechaActual = new Date();
      if (fechaSeleccionada < fechaActual) {
        return { fechaAnterior: true };
      }
      return null;
    };
  }
}
