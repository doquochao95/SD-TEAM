import { NgModule } from '@angular/core';
import { NgxPrintIvyComponent } from './ngx-print-ivy.component';
import { NgxPrintIvyDirective } from './ngx-print-ivy.directive';


@NgModule({
  declarations: [
    NgxPrintIvyComponent,
    NgxPrintIvyDirective
  ],
  exports: [
    NgxPrintIvyComponent,
    NgxPrintIvyDirective
  ]
})
export class NgxPrintIvyModule { }
