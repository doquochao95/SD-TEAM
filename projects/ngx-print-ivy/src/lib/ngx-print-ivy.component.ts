import { Component } from '@angular/core';
import { Config, NgxPrintIvyService } from './ngx-print-ivy.service';
import { AsyncSubject } from 'rxjs';

@Component({
  selector: 'ngx-print-ivy',
  template: `<ng-content></ng-content>`,
  exportAs: 'element'
})
export class NgxPrintIvyComponent {

  constructor(private prints: NgxPrintIvyService) { }

  /**
   * print
   * @param id
   * @param config
   * @returns
   */
  public print(id: string, config?: Config): AsyncSubject<any> {
    return this.prints.print(id, config);
  }
}
