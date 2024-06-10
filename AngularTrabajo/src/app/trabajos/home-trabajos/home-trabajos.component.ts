import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TrabajoService} from "../../services/trabajos/trabajo.service";
import {Trabajo} from "../../modelos/trabajo";

@Component({
  selector: 'app-home-trabajos',
  standalone: true,
    imports: [
        NgForOf,
        RouterLink
    ],
  templateUrl: './home-trabajos.component.html',
  styleUrl: './home-trabajos.component.css'
})
export class HomeTrabajosComponent implements OnInit{
  trabajos: Trabajo[] = [];
  constructor(private trabajoService: TrabajoService) {}
  async ngOnInit() {
    await this.trabajoService.loadTrabajos();
    this.trabajos = this.trabajoService.getTrabajos();
    console.log(this.trabajos);
  }


}
