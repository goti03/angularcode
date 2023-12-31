import {
  Component,
  Input,
  OnDestroy,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { breadcrumbMessage } from './breadcrumb-message.service';

@Component({
  selector: 'app-spinner',
  template: `<div class="preloader" *ngIf="isSpinnerVisible">
        <div class="spinner">
          <div class="double-bounce1"></div>
          <div class="double-bounce2"></div>
        </div>
    </div>`,
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
  public isSpinnerVisible = true;

  @Input() public backgroundColor = 'rgba(0, 115, 170, 0.69)';

  constructor(
    private router: Router,private set : breadcrumbMessage,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.router.events.subscribe(
      event => {
        if (event instanceof NavigationStart) {
          this.isSpinnerVisible = true;
          const time = setTimeout(() => {
            this.isSpinnerVisible = false;
            clearInterval(time);
          }, 5000);
          // this.set.setOption('',true);
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
          ) {
          // this.set.setOption('',true);
          this.isSpinnerVisible = false;
        }
      },
      () => {
        // this.set.setOption('',true);
        this.isSpinnerVisible = false;
      }
      );
    }
    
    ngOnDestroy(): void {
    // this.set.setOption('',true);
    this.isSpinnerVisible = false;
  }
}
