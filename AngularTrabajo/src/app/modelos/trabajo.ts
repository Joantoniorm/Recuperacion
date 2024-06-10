export interface Revision {
  id:number;
  fecha: Date;
  comentarios: string[];
  finalizada: boolean;
}
export interface Trabajo {
  id: number;
  estado: string;
  alumnoId: number;
  tutorId: number;
  descripcion: string;
  completado: boolean;
  revisiones: Revision[];
}
