import { Routes } from '@angular/router';
import {HomeAlumnosComponent} from "./alumnos/home-alumnos/home-alumnos.component";
import {DetailsAlumnosComponent} from "./alumnos/details-alumnos/details-alumnos.component";
import {CreateAlumnosComponent} from "./alumnos/create-alumnos/create-alumnos.component";
import {HomeTutoresComponent} from "./tutores/home-tutores/home-tutores.component";
import {DetailsTutoresComponent} from "./tutores/details-tutores/details-tutores.component";
import {CreateTutoresComponent} from "./tutores/create-tutores/create-tutores.component";
import {HomeTrabajosComponent} from "./trabajos/home-trabajos/home-trabajos.component";
import {DetailsTrabajosComponent} from "./trabajos/details-trabajos/details-trabajos.component";
import {CreateTrabajosComponent} from "./trabajos/create-trabajos/create-trabajos.component";
import {AppComponent} from "./app.component";
import {UpdateTrabajosComponent} from "./trabajos/update-trabajos/update-trabajos.component";
import {RevisionesUpdateComponent} from "./trabajos/revisiones/revisiones-update/revisiones-update.component";
import {RevisionesCreateComponent} from "./trabajos/revisiones/revisiones-create/revisiones-create.component";

export const routes: Routes = [
  {
    path: 'alumnos',
    component: HomeAlumnosComponent,
    title: 'Home Alumnos'
  },
  {
    path: 'alumnos/details/:id',
    component: DetailsAlumnosComponent,
    title: 'Details Alumnos'
  },
  {
    path: 'alumnos/create',
    component: CreateAlumnosComponent,
    title: 'Create Alumno'
  },
  {
    path: 'tutores',
    component: HomeTutoresComponent,
    title: 'Home Tutores'
  },
  {
    path: 'tutores/details/:id',
    component: DetailsTutoresComponent,
    title: 'Details Tutores'
  },
  {
    path: 'tutores/create',
    component: CreateTutoresComponent,
    title: 'Create Tutor'
  },
  {
    path: 'trabajos',
    component: HomeTrabajosComponent,
    title: 'Home Trabajos'
  },
  {
    path: 'trabajos/details/:id',
    component: DetailsTrabajosComponent,
    title: 'Details Trabajos'
  },
  {
    path: 'trabajos/create',
    component: CreateTrabajosComponent,
    title: 'Create Trabajo'
  },{
    path:'trabajos/update/:id',
    component: UpdateTrabajosComponent,
    title:'Update Trabajo'
  }
  ,{
    path:'trabajos/:id/update/:revisionId',
    component: RevisionesUpdateComponent,
    title:'Update Revision'
  },{
    path:'trabajos/:id/create/revision',
    component: RevisionesCreateComponent,
    title:'create Revision'
  }
];
export default Routes;
