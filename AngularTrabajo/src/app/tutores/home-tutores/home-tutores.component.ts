import { Component } from '@angular/core';
import {TutorService} from "../../services/tutores/tutor.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home-tutores',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './home-tutores.component.html',
  styleUrl: './home-tutores.component.css'
})
export class HomeTutoresComponent {
  constructor(public tutorService:TutorService) {
    console.log(this.tutorService.getTutores())
  }
}
