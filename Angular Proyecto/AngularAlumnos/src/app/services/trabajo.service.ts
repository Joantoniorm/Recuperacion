// src/app/services/trabajos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trabajo } from '../modelos/Trabajo';

@Injectable({
  providedIn: 'root'
})
export class TrabajosService {
  private apiUrl = 'assets/data/trabajos.json';
  private trabajos: Trabajo[] = [];

  constructor(private http: HttpClient) {
    this.loadTrabajos();
  }

  private loadTrabajos() {
    this.http.get<Trabajo[]>(this.apiUrl).subscribe(data => {
      this.trabajos = data;
    });
  }

  getTrabajos(): Trabajo[] {
    return this.trabajos;
  }

  addTrabajo(trabajo: Trabajo): void {
    trabajo.id = this.trabajos.length ? Math.max(...this.trabajos.map(t => t.id)) + 1 : 1;
    this.trabajos.push(trabajo);
  }

  updateTrabajo(trabajo: Trabajo): void {
    const index = this.trabajos.findIndex(t => t.id === trabajo.id);
    if (index > -1) {
      this.trabajos[index] = trabajo;
    }
  }

  deleteTrabajo(id: number): void {
    this.trabajos = this.trabajos.filter(t => t.id !== id);
  }
}
