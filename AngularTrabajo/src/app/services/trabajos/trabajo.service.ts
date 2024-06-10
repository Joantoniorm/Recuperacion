import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Revision, Trabajo} from "../../modelos/trabajo";
import { catchError } from "rxjs/operators";
import {lastValueFrom, Observable, of, tap} from "rxjs";
import {Tutor} from "../../modelos/tutor";

@Injectable({
    providedIn: 'root'
})
export class TrabajoService {

    private trabajosUrl = 'http://localhost:29050/trabajos';
    public trabajos: Trabajo[] = [];
    private dataTrabajoLoaded = false;

    constructor(private http: HttpClient) {
      this.fetchTrabajos().subscribe()
    }

    fetchTrabajos(): Observable<Trabajo[]> {
        return this.http.get<Trabajo[]>(this.trabajosUrl)
            .pipe(tap(trabajos => this.trabajos=trabajos));
    }

    async loadTrabajos(): Promise<void> {
        if (!this.dataTrabajoLoaded) { // Solo cargar los datos si no se han cargado antes
            try {
                const trabajos = await lastValueFrom(this.fetchTrabajos());
                this.trabajos = trabajos || []; // Asegurarse de que no sea undefined
                this.dataTrabajoLoaded = true; // Marcar que los datos han sido cargados
            } catch (error) {
                console.error('Error al obtener los trabajos:', error);
                this.trabajos = [];
            }
        }
    }

    getTrabajos(): Trabajo[] {
        return this.trabajos;
    }
    getTrabajo(id: number): Trabajo | undefined {
        return this.trabajos.find(trabajo => trabajo.id == id);
    }
    getTrabajoByAlumno(id:number):Trabajo|undefined{
      return this.trabajos.find(trabajo=>trabajo.alumnoId==id);
    }

    addTrabajo(nuevoTrabajo: Trabajo): void {
        const nuevoId = this.trabajos.length > 0 ? Math.max(...this.trabajos.map(t => t.id)) + 1 : 1;
        nuevoTrabajo.id = nuevoId;
        this.trabajos.push(nuevoTrabajo);
    }

    updateTrabajo(trabajo: Trabajo): void {
        const index = this.trabajos.findIndex(t => t.id === trabajo.id);
        if (index !== -1) {
            this.trabajos[index] = trabajo;
        }
    }

    deleteTrabajo(id: number): void {
        this.trabajos = this.trabajos.filter(trabajo => trabajo.id !== id);
    }
    addRevision(trabajoId: number, nuevaRevision: Revision): void {
        const trabajo = this.getTrabajo(trabajoId);
        if (trabajo) {
            // Generar un nuevo id para la revisión
            nuevaRevision.id = this.generateNewRevisionId(trabajo.revisiones);
            // Agregar la nueva revisión a la lista de revisiones del trabajo
            trabajo.revisiones.push(nuevaRevision);
        }
    }
  updateRevision(trabajoId: number, revisionId: number, revisionActualizada: Revision): void {
    const trabajo = this.getTrabajo(trabajoId);
    if (trabajo) {
      const index = trabajo.revisiones.findIndex(rev => rev.id === revisionId);
      if (index !== -1) {
        trabajo.revisiones[index] = revisionActualizada;
      }
    }
  }

  deleteRevision(trabajoId: number, revisionId: number): void {
    const trabajo = this.getTrabajo(trabajoId);
    if (trabajo) {
      trabajo.revisiones = trabajo.revisiones.filter(rev => rev.id !== revisionId);
    }
  }

    private generateNewRevisionId(revisiones: Revision[]): number {
        // Obtener el último id utilizado para una revisión
        const lastId = revisiones.length > 0 ? Math.max(...revisiones.map(r => r.id)) : 0;
        // Generar el nuevo id sumando 1 al último id utilizado
        return lastId + 1;
    }



}
