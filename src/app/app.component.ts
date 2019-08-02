import { Component, HostListener, ElementRef, ViewChild } from '@angular/core';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('scroller', [
      state('show', style({
        opacity: 1,
        transform: "translateX(0)"
      })),
      state('hide',   style({
        opacity: 0,
        transform: "translateX(-100%)"
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class AppComponent {
  title = 'animationLab';
  state='show';
  isSticky=false;
@ViewChild('graphs',{static:true}) el : ElementRef;
  constructor (){

  }

  @HostListener('window:scroll', ['$event'])
    checkScroll() {
      if(!this.isSticky) {
        const componentPosition = this.el.nativeElement.offsetTop
        const scrollPosition = window.pageYOffset
        if (scrollPosition <= componentPosition) {
          this.state = 'show'
        } else {
          this.state = 'hide'
        }
      }
    }

    onCheck(){
      this.isSticky = !this.isSticky;
    }

}
