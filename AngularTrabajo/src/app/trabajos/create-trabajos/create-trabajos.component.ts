import {Component, OnInit} from '@angular/core';
import {Trabajo} from "../../modelos/trabajo";
import {TrabajoService} from "../../services/trabajos/trabajo.service";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {AlumnoService} from "../../services/alumnos/alumno.service";
import {TutorService} from "../../services/tutores/tutor.service";
import {Tutor} from "../../modelos/tutor";
import {Alumno} from "../../modelos/alumno";

@Component({
  selector: 'app-create-trabajos',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './create-trabajos.component.html',
  styleUrl: './create-trabajos.component.css'
})
export class CreateTrabajosComponent implements OnInit{
  nuevoTrabajo : Trabajo={
    id:0,
    estado: "",
    alumnoId:0,
    tutorId:0,
    descripcion:"",
    completado:false,
    revisiones:[]
  }
  tutores: Tutor[]=[];
  alumnos: Alumno[]=[]
  constructor(private trabajoService:TrabajoService,private alumnoService:AlumnoService,private tutoresService:TutorService,private router: Router) {
  }
  getAlumnosSinTrabajo(): Alumno[] {
    // Obtenemos los IDs de los alumnos que tienen trabajos asignados
    const alumnosConTrabajoIds = this.trabajoService.getTrabajos().map(trabajo => trabajo.alumnoId);
    console.log(alumnosConTrabajoIds)
    // Filtramos la lista de todos los alumnos para incluir solo aquellos cuyos IDs no estén en la lista de alumnos con trabajo asignado
    console.log(this.alumnoService.getAlumnos().filter(alumno => !alumnosConTrabajoIds.includes(alumno.id)))
    return this.alumnoService.getAlumnos().filter(alumno => !alumnosConTrabajoIds.includes(Number(alumno.id)));
  }
  ngOnInit(): void {
    this.alumnos = this.getAlumnosSinTrabajo();
    this.tutores=this.tutoresService.getTutores();


  }
  crearTrabajo():void{
    this.trabajoService.addTrabajo(this.nuevoTrabajo);
    alert('El trabajo ha sido creado.');
    this.router.navigate(['/trabajos']);
  }


}
