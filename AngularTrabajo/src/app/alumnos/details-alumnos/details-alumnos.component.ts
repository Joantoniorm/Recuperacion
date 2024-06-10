import {Component, OnInit} from '@angular/core';
import { Alumno } from "../../modelos/alumno";
import { AlumnoService } from "../../services/alumnos/alumno.service";
import { NgForOf } from "@angular/common";
import { TutorService } from "../../services/tutores/tutor.service";
import { Tutor } from "../../modelos/tutor";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Trabajo} from "../../modelos/trabajo";
import {TrabajoService} from "../../services/trabajos/trabajo.service";


@Component({
  selector: 'app-details-alumnos',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './details-alumnos.component.html',
  styleUrl: './details-alumnos.component.css'
})
export class DetailsAlumnosComponent implements OnInit{
  alumno: Alumno | undefined;
  tutores!: Tutor[];
  tutor: Tutor|undefined;
  trabajo: Trabajo| undefined;

  alumnoId!: number | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public alumnoService: AlumnoService,
    private tutorService: TutorService,
    private trabajoService: TrabajoService
  ) {}

  async ngOnInit(): Promise<void> {
    this.getAlumnoDetails();
    console.log(this.tutorService.getTutores());
  }

  getTutordeAlumno(id: number): Tutor | undefined {
    this.tutor = this.tutorService.getTutor(id);
    return this.tutor;
  }
  getTrabajodeAlumno(id:number):Trabajo|undefined{
   this.trabajo = this.trabajoService.getTrabajoByAlumno(id)
    return this.trabajo;
  }
  getAlumnoDetails(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    const alumnoId = idString ? Number(idString) : undefined;
    if (alumnoId !== undefined) {
      this.alumno = this.alumnoService.getAlumno(alumnoId);
      if (this.alumno) {
        this.getTutordeAlumno(this.alumno.tutorId);
        this.getTrabajodeAlumno(this.alumno.id)
        console.log(this.getTrabajodeAlumno(this.alumno.id))
      }
    }
  }

  deleteAlumno(id: number | undefined): void {
    if (id !== undefined) {
      const confirmacion = window.confirm('¿Estás seguro de que deseas borrar al alumno?');
      if (confirmacion) {
        this.alumnoService.deleteAlumno(id);
        alert('El alumno ha sido borrado.');
        this.router.navigate(['/alumnos']);
      }
    } else {
      console.error('ID de alumno no definido.');
    }
  }
}

