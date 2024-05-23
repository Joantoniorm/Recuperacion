export interface Trabajo {
    id: number;
    estado: string;
    alumnoId: number;
    profesorId: number;
    descripcion: string;
    completado: boolean;
  }