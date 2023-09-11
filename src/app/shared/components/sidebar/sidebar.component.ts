import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private GifsService: GifsService) {
  }

  // let valor = this.GifsService.tagHistrory
  // valor  = this.GifsService.tagHistrory;
  get tags() {
    return this.GifsService.tagHistrory
  }

  buscar(valor : string){
    this.GifsService.searchTag(valor)
    // console.log(valor)
  }



}
