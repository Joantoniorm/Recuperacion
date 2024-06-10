import {Component, OnInit} from '@angular/core';
import{AppComponent} from "../../app.component";
import {Alumno} from "../../modelos/alumno";
import {AlumnoService} from "../../services/alumnos/alumno.service";
import {Router} from "@angular/router";
import {TutorService} from "../../services/tutores/tutor.service";
import {Tutor} from "../../modelos/tutor";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-create-alumnos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-alumnos.component.html',
  styleUrl: './create-alumnos.component.css'
})
export class CreateAlumnosComponent implements OnInit{
  nuevoAlumno: Alumno = {
    id: 0,
    nombre: '',
    apellido: '',
    tutorId: 0
  };
  tutores: Tutor[]=[];
  constructor(private alumnoService: AlumnoService, private router: Router,private tutorService:TutorService) { }
  ngOnInit(): void {
   this.tutores = this.tutorService.getTutores()
  }
  crearAlumno(): void {
    this.alumnoService.addAlumno(this.nuevoAlumno);
    alert('El alumno ha sido creado.');
    this.router.navigate(['/alumnos']);
  }
}
