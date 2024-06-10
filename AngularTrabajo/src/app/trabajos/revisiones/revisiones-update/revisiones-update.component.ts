import {Component, OnInit} from '@angular/core';
import {Revision} from "../../../modelos/trabajo";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TrabajoService} from "../../../services/trabajos/trabajo.service";

@Component({
  selector: 'app-revisiones-update',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './revisiones-update.component.html',
  styleUrl: './revisiones-update.component.css'
})
export class RevisionesUpdateComponent implements OnInit{
  revisionForm: FormGroup;
  trabajoId: number | null = null;
  revisionId: number | null = null;
  revision: Revision | undefined;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private trabajoService: TrabajoService
  ) {
    this.revisionForm = this.fb.group({
      fecha: ['', Validators.required],
      comentarios: ['', Validators.required],
      finalizada: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.trabajoId = Number(this.route.snapshot.paramMap.get('id'));
    this.revisionId = Number(this.route.snapshot.paramMap.get('revisionId'));
    if (this.trabajoId && this.revisionId) {
      const trabajo = this.trabajoService.getTrabajo(this.trabajoId);
      if (trabajo) {
        this.revision = trabajo.revisiones.find(rev => rev.id === this.revisionId);
        if (this.revision) {
          this.revisionForm.patchValue(this.revision);
        }
      }
    }
  }

  onSubmit(): void {
    if (this.revisionForm.valid && this.trabajoId && this.revisionId && this.revision) {
      const comentarios = this.revisionForm.value.comentarios;
      const comentariosArray = typeof comentarios === 'string' ? [comentarios] : comentarios;
      const updatedRevision: Revision = {
        ...this.revision,
        id: this.revision.id,
        fecha: this.revisionForm.value.fecha,
        comentarios: comentariosArray,
        finalizada: this.revisionForm.value.finalizada
      };
      this.trabajoService.updateRevision(this.trabajoId, this.revisionId, updatedRevision);
      this.router.navigate(['/trabajos']);
    }
}
}
