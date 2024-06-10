import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Alumno} from "../modelos/alumno";
import { map } from 'rxjs/operators';
import {Trabajo} from "../modelos/trabajo";
import {Tutor} from "../modelos/tutor";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private alumnosUrl = 'http://localhost:29040/alumnos';
  private tutoresUrl = 'http://localhost:29030/tutores';
  private trabajosUrl='assets/data/trabajos.json'
  constructor(private http:HttpClient) {}
  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<{alumnos: Alumno[]}>(this.alumnosUrl).pipe(map(response =>
    {console.log(response);
      return response.alumnos})
    );
  }
  getTrabajos(): Observable<Trabajo[]> {
    return this.http.get<{ trabajos: Trabajo[] }>(this.trabajosUrl).pipe(
      map(response => response.trabajos)
    );
  }
  getTutores():Observable<Tutor[]>{
    return this.http.get<{tutor:Tutor[]}>(this.tutoresUrl).pipe(map
    (response=>{console.log(response); return response.tutor})
    );
  }
}
