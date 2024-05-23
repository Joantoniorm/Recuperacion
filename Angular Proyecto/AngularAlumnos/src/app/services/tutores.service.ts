// src/app/services/tutores.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profesor } from '../modelos/Profesor';

@Injectable({
  providedIn: 'root'
})
export class TutoresService {
  private apiUrl = 'assets/data/tutores.json';
  private tutores: Profesor[] = [];

  constructor(private http: HttpClient) {
    this.loadTutores();
  }

  private loadTutores() {
    this.http.get<Profesor[]>(this.apiUrl).subscribe(data => {
      this.tutores = data;
    });
  }

  getTutores(): Profesor[] {
    return this.tutores;
  }

  addTutor(tutor: Profesor): void {
    tutor.id = this.tutores.length ? Math.max(...this.tutores.map(t => t.id)) + 1 : 1;
    this.tutores.push(tutor);
  }

  updateTutor(tutor: Profesor): void {
    const index = this.tutores.findIndex(t => t.id === tutor.id);
    if (index > -1) {
      this.tutores[index] = tutor;
    }
  }

  deleteTutor(id: number): void {
    this.tutores = this.tutores.filter(t => t.id !== id);
  }
}
