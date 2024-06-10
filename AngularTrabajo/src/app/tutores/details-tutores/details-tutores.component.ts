import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AlumnoService} from "../../services/alumnos/alumno.service";
import {TutorService} from "../../services/tutores/tutor.service";
import {Alumno} from "../../modelos/alumno";
import {Tutor} from "../../modelos/tutor";

@Component({
  selector: 'app-details-tutores',
  standalone: true,
  imports: [],
  templateUrl: './details-tutores.component.html',
  styleUrl: './details-tutores.component.css'
})
export class DetailsTutoresComponent implements OnInit{
  alumno: Alumno | undefined;
  tutores!: Tutor[];
  tutor: Tutor|undefined;
  constructor(
    private router: Router,
    private route:ActivatedRoute,
    public alumnoService: AlumnoService,
    public tutorService:TutorService
  ) {
  }
  ngOnInit(): void {
    this.getTutorDetails()
  }
  getTutorDetails():void{
    const idString=this.route.snapshot.paramMap.get('id');
    const tutorId=idString?Number(idString):undefined;
    if (tutorId!==undefined){
      this.tutor=this.tutorService.getTutor(tutorId);
    }
  }
}
