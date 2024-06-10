import {Component, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {Observable} from "rxjs";
import {Alumno} from "../../modelos/alumno";
import {AlumnoService} from "../../services/alumnos/alumno.service";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-home-alumnos',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './home-alumnos.component.html',
  styleUrl: './home-alumnos.component.css'
})
export class HomeAlumnosComponent {
  title = 'AngularTrabajo';
  constructor(public alumnoService: AlumnoService) {
    console.log(this.alumnoService.getAlumnos())
  }



  /*ngOnInit(): void {
    this.alumnoService.getAlumnos().subscribe(
      alumnos => {
        this.alumnos = alumnos; // Asigna los datos de los alumnos a la variable local
      },
      error => {
        console.error('Error al obtener datos de alumnos:', error);
      }
    );
  }*/

}
