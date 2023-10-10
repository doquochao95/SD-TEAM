import { Injectable } from '@angular/core';
import { AS_COMPLETE, printHtml } from './ngx-print-ivy.helper';
import { AsyncSubject } from 'rxjs';

export interface Config {
  htmlType?: string;
  printMode?: string;
  pageTitle?: string;
  templateString?: string;
  popupProperties?: string;
  stylesheets?: {
    rel?: string,
    href?: string
  }[],
  styles?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class NgxPrintIvyService {

  /**
   * Print
   * @param id
   * @param config
   * @param as
   * @returns
   */
  public print(id: string, config?: Config, as = new AsyncSubject()): AsyncSubject<any> {
    // Create and insert new print section
    const container = document.getElementById(id);
    switch (config && config.printMode) {
      case 'template':
        printHtml(container, { ...config, printMode: '' }, as);
        break;
      case 'template-popup':
        printHtml(container, { ...config, printMode: 'popup' }, as);
        break;
      default:
        if (container) {
          // Declare
          const domClone = container.cloneNode(true);
          const $printSection = document.createElement('div');
          // Add visibility hidden into body
          const bodyEl = document.querySelector('body');
          if (bodyEl) {
            bodyEl.setAttribute('style', 'visibility: hidden !important;');
          }
          // Clone element container
          $printSection.id = 'ngx-print-element';
          $printSection.appendChild(domClone);
          document.body.insertBefore($printSection, document.body.firstChild);
          // Print
          window.print();
          window.onafterprint = (event) => AS_COMPLETE(as, event);
          // Clean up print section for future use
          const oldElem = document.getElementById('ngx-print-element');
          if (oldElem) {
            oldElem.parentNode && oldElem.parentNode.removeChild(oldElem);
            oldElem.remove();
          }
          // Clear visibility: hidden
          bodyEl && (bodyEl.style.visibility = '');
        }
        break;
    }
    return as;
  }
}
