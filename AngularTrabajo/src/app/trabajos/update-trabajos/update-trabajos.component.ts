import {Component, OnInit} from '@angular/core';
import {Trabajo} from "../../modelos/trabajo";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TrabajoService} from "../../services/trabajos/trabajo.service";

@Component({
  selector: 'app-update-trabajos',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './update-trabajos.component.html',
  styleUrl: './update-trabajos.component.css'
})
export class UpdateTrabajosComponent implements OnInit{
  trabajoForm: FormGroup;
  trabajo: Trabajo | undefined;
  trabajoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private trabajoService: TrabajoService
  ) {
    this.trabajoForm = this.fb.group({
      estado: ['', Validators.required],
      alumnoId: ['', Validators.required],
      tutorId: ['', Validators.required],
      descripcion: ['', Validators.required],
      completado: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.trabajoId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.trabajoId) {
      this.trabajo = this.trabajoService.getTrabajo(this.trabajoId);
      if (this.trabajo) {
        this.trabajoForm.patchValue({
          estado: this.trabajo.estado,
          alumnoId: this.trabajo.alumnoId,
          tutorId: this.trabajo.tutorId,
          descripcion: this.trabajo.descripcion,
          completado: this.trabajo.completado
        });
      }
    }
  }

  onSubmit(): void {
    if (this.trabajoForm.valid) {
      const updatedTrabajo: Trabajo = {
        ...this.trabajo!,
        ...this.trabajoForm.value
      };
      this.trabajoService.updateTrabajo(updatedTrabajo);
      this.router.navigate(['/trabajos']);
    }
  }

}
