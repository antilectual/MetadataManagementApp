/**
* Future TODO: Smooth animation if possible.
* @file  scroll-indicator.ts
* @author  Matthew Johnson
* @brief  Diretive to control the behavior of the indicator showing scrolling is possible on a page.
*
* Generated class for the ScrollIndicatorDirective directive.
*
*
*/

import { Content } from 'ionic-angular';
import { Directive, Input, Renderer2 } from '@angular/core';


@Directive({
  selector: '[scroll-indicator]', // Attribute selector
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class ScrollIndicatorDirective {

    @Input('scroll-content') scrollContent: Content;
    @Input('scroll-indicator') scrollIndicator: any;

    prevScrollHeight: number = 0;
    contentHeight: number;
    scrollHeight: number;
    lastScrollPosition: number;
    lastValue: number = 0;

    constructor(private renderer: Renderer2) {

    }

    /**
    * @brief ngOnInit (Initialization)
    *
    * @details Sets default settings when a page with a scroll indicator is loaded
    *          (Hidden initialially)
    *
    * @return None
    */
    ngOnInit()
    {
      if(this.scrollIndicator != null && this.scrollIndicator != undefined)
      {
        // Hide the indicator
        this.renderer.setStyle(this.scrollIndicator, "margin-bottom", "-" + this.scrollIndicator.offsetHeight + "px");
        // Initial height of the page as read for scrolling
        this.prevScrollHeight = this.scrollContent.getScrollElement().scrollHeight;
      }
    }

    /**
    * @brief ngAfterContentChecked (Loaded)
    *
    * @details If the page changes between initialization and content being loaded, adjust default settings.
    *          Shows the indicator if the page has scroll. Necessary because scroll height is not finished
    *          updating before onInit completes.
    *
    * @return None
    */
    ngAfterContentChecked()
    {
      if(this.scrollIndicator != null && this.scrollIndicator != undefined)
      {
        // Check if the height of the page has changed since init
        if(this.prevScrollHeight != 0 && this.scrollContent.getScrollElement().scrollHeight > this.prevScrollHeight)
        {
            // if it's scrolliable, show the indicator again.
            this.renderer.setStyle(this.scrollIndicator, "margin-bottom", "0px");
        }
      }
    }


    /**
    * @brief onContentScroll
    *
    * @details Hides and displays the scroll indication when needed.
    8          (e.g. When at the bottomn of the page)
    *
    * @return None
    */
    onContentScroll(event)
    {
      if(this.scrollIndicator != null && this.scrollIndicator != undefined)
      {
        let heightAdjust = (this.scrollContent.getScrollElement().scrollHeight - (this.scrollContent.getScrollElement().offsetHeight + this.scrollContent.getScrollElement().scrollTop));
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
}
