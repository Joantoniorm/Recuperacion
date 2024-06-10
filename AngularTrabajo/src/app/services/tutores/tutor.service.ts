import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {Tutor} from "../../modelos/tutor";
import {map} from "rxjs/operators";
import {AlumnoService} from "../alumnos/alumno.service";
import {Alumno} from "../../modelos/alumno";

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private tutoresUrl = 'http://localhost:29030/tutores';
  public tutores: Tutor[] = [];
  public alumnos: Alumno[] = [];
  constructor(private http:HttpClient,private alumnoService:AlumnoService) {
    this.fetchTutores().subscribe();
  }
  fetchTutores():Observable<Tutor[]>{
    return this.http.get<Tutor[]>(this.tutoresUrl)
      .pipe(tap(tutores=>this.tutores=tutores))
}
  getTutores():Tutor[]{
    return this.tutores;
  }
  getTutor(id:number):Tutor | undefined{
    console.log(this.tutores.find(tutor=>tutor.id==id))
   return this.tutores.find(tutor=>tutor.id==id);
  }
  addTutor(tutor: Tutor):void{
    tutor.id = this.tutores.length>0? Math.max(...this.tutores.map(a=>a.id))+1:1;
    this.tutores.push(tutor);
  }
  deleteTutor(id:number){
    this.tutores=this.tutores.filter(t=>t.id!==id);
  }
  getAlumnosfromTutor(idTutor:number){
    return (this.alumnoService.alumnos.filter(a=>a.tutorId==idTutor));
  }
}
