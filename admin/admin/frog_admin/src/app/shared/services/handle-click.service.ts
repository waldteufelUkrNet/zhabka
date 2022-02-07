import { Input, Injectable, ElementRef } from '@angular/core';
import { NavView } from './nav-view.interface'

@Injectable()
export class HandleClick {
  @Input() view: NavView;
  public elementRef: any;

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }

  handleClick(event: any, isView: boolean): void {
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);

    if (!inside) {
      this.view.isView = false;
    }
  }
}
