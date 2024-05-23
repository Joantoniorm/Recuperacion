// src/app/services/alumnos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../modelos/Alumno';

@Injectable({
  providedIn: 'root'
})

export class AlumnosService {
  private apiUrl = 'assets/data/alumnos.json';
  private alumnos: Alumno[] = [];

  constructor(private http: HttpClient) {
    this.loadAlumnos();
  }

  private loadAlumnos() {
    this.http.get<Alumno[]>(this.apiUrl).subscribe(data => {
      this.alumnos = data;
    });
  }

  getAlumnos(): Alumno[] {
    return this.alumnos;
  }

  addAlumno(alumno: Alumno): void {
    alumno.id = this.alumnos.length ? Math.max(...this.alumnos.map(a => a.id)) + 1 : 1;
    this.alumnos.push(alumno);
  }

  updateAlumno(alumno: Alumno): void {
    const index = this.alumnos.findIndex(a => a.id === alumno.id);
    if (index > -1) {
      this.alumnos[index] = alumno;
    }
  }

  deleteAlumno(id: number): void {
    this.alumnos = this.alumnos.filter(a => a.id !== id);
  }
}