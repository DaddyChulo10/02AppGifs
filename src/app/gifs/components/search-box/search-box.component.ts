import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent {


  // @ViewChild('')Un elemento input de manera local 
  // @ViewChildren('')varios inputs de manera local 

  
  @ViewChild('txtTagInput')
  public taginput!: ElementRef<HTMLInputElement>


  constructor(private GifsService: GifsService) {

  }

  searchTag() {
    const newTag = this.taginput.nativeElement.value
    this.GifsService.searchTag(newTag)
    this.taginput.nativeElement.value = ''
    // console.log({newTag})
  }
}
