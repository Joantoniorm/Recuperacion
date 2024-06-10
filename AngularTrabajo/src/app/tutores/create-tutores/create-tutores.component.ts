import { Component } from '@angular/core';
import {Tutor} from "../../modelos/tutor";
import {TutorService} from "../../services/tutores/tutor.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-create-tutores',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-tutores.component.html',
  styleUrl: './create-tutores.component.css'
})
export class CreateTutoresComponent {
  nuevoTutor: Tutor = {
    id: 0,
    nombre: '',
    apellido: ''
  };

  constructor(
      private tutorService: TutorService,
      private router: Router
  ) {}

  ngOnInit(): void {
  }

  crearTutor(): void {
    this.tutorService.addTutor(this.nuevoTutor);
    alert('El tutor ha sido creado.');
    this.router.navigate(['/tutores']);
  }
}
