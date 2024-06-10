import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {lastValueFrom, Observable, of, tap} from "rxjs";
import {Alumno} from "../../modelos/alumno";
import {Trabajo} from "../../modelos/trabajo";
import {map} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  private alumnosUrl = 'http://localhost:29040/alumnos';
  public alumnos: Alumno[] = [];
  private dataAlumnoLoaded = false;

  constructor(private http: HttpClient) {
    this.fetchAlumnos().subscribe();
  }

  fetchAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.alumnosUrl)
      .pipe(
        tap(alumnos => {
          this.alumnos = alumnos;
          this.dataAlumnoLoaded = true;
        })
      );
  }

  getAlumnos(): Alumno[] {
    if (!this.dataAlumnoLoaded) {
      console.error('Los datos de alumnos aún no se han cargado.');
    }
    return this.alumnos;
  }

  getAlumno(id: number): Alumno | undefined {
    if (!this.dataAlumnoLoaded) {
      console.error('Los datos de alumnos aún no se han cargado.');
    }
    return this.alumnos.find(alumno => alumno.id == id);
  }

  deleteAlumno(id: number): void {
    if (!this.dataAlumnoLoaded) {
      console.error('Los datos de alumnos aún no se han cargado.');
    } else {
      this.alumnos = this.alumnos.filter(alumno => alumno.id !== id);
    }
  }

  addAlumno(alumno: Alumno): void {
    if (!this.dataAlumnoLoaded) {
      console.error('Los datos de alumnos aún no se han cargado.');
    } else {
      alumno.id = this.alumnos.length > 0 ? Math.max(...this.alumnos.map(a => a.id)) + 1 : 1;
      this.alumnos.push(alumno);
    }
  }
}
