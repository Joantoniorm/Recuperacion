import {Component, OnInit} from '@angular/core';
import {Trabajo} from "../../modelos/trabajo";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TrabajoService} from "../../services/trabajos/trabajo.service";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-details-trabajos',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './details-trabajos.component.html',
  styleUrl: './details-trabajos.component.css'
})
export class DetailsTrabajosComponent implements OnInit{
  trabajo: Trabajo |undefined;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private trabajoService: TrabajoService) {
  }
 async ngOnInit():Promise<void>{
    this.getTrabajoDetails()
  }
 getTrabajoDetails(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    const trabajoId = idString ? Number(idString) : undefined;
    if (trabajoId !== undefined) {
      this.trabajo = this.trabajoService.getTrabajo(trabajoId);
    }
  }


}
