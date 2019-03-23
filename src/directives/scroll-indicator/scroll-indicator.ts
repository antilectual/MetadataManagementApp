import { Content } from 'ionic-angular';
import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';

/**
 * Generated class for the ScrollIndicatorDirective directive.
 *
 * Modified from: https://medium.com/@gregor.srdic/ionic3-hidding-header-on-footer-on-content-scroll-15ab95b05dc5
 */
@Directive({
  selector: '[scroll-indicator]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class ScrollIndicatorDirective {

    @Input('scroll-content') scrollContent: Content;
    @Input('scroll-indicator') scrollIndicator: Content;

    prevScrollHeight: number = 0;
    contentHeight: number;
    scrollHeight: number;
    lastScrollPosition: number;
    lastValue: number = 0;

    constructor(private element: ElementRef, private renderer: Renderer2) {

    }

    ngOnInit()
    {
      // Hide the indicator
      this.renderer.setStyle(this.scrollIndicator, "margin-bottom", "-" + this.scrollIndicator.offsetHeight + "px");
      // Initial height of the page as read for scrolling
      this.prevScrollHeight = this.scrollContent.getScrollElement().scrollHeight;
    }

    ngAfterContentChecked()
    {
      // Check if the height of the page has changed since init
      if(this.prevScrollHeight != 0 && this.scrollContent.getScrollElement().scrollHeight > this.prevScrollHeight)
      {
          // if it's scrolliable, show the indicator again.
          this.renderer.setStyle(this.scrollIndicator, "margin-bottom", "0px");
      }

    }

    onContentScroll(event)
    {
      let heightAdjust = (this.scrollContent.getScrollElement().scrollHeight - (this.scrollContent.getScrollElement().offsetHeight + this.scrollContent.scrollTop));
      if(heightAdjust < this.scrollIndicator.offsetHeight)
      {
        this.renderer.setStyle(this.scrollIndicator, "margin-bottom", "-" + (this.scrollIndicator.offsetHeight + 1) + "px");
      }
      else
      {
          this.renderer.setStyle(this.scrollIndicator, "margin-bottom", "0px");
      }
    }
}
