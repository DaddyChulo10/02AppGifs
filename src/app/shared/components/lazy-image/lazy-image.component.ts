import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css']
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;

  @Input()
  public alt: string = 'No Data';

  public hasLoader: boolean = false

  ngOnInit(): void {
    if (!this.url) throw new Error('URL property is required (Lazy Image)')
  }

  onLoad() {

    setTimeout(() => {
      this.hasLoader = true

    }, 1000)



  }


}
