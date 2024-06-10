import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Alumno} from "./modelos/alumno";
import {Tutor} from "./modelos/tutor";
import {Trabajo} from "./modelos/trabajo";
import {DataService} from "./services/data.service";
import {CommonModule} from "@angular/common";
import {AlumnoService} from "./services/alumnos/alumno.service";
import {TutorService} from "./services/tutores/tutor.service";
import {TrabajoService} from "./services/trabajos/trabajo.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'AngularTrabajo';
  alumnos!: Observable<Alumno[]>;
  datosCargados= false;
  constructor(
    private alumnoService:AlumnoService,
    private trabajoService:TrabajoService,
    private tutoreService:TutorService,
  ) {}



  /*ngOnInit(): void {
   this.alumnos=this.alumnoService.getAlumnos()
    this.alumnos.subscribe(
      alumnos => {
        console.log('Datos de alumnos en AppComponent:', alumnos);
        // Aquí puedes realizar cualquier acción adicional después de recibir los datos
      },
      error => {
        console.error('Error al obtener datos de alumnos:', error);
      }
    );
  }*/

}
