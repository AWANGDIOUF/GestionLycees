import { Injectable } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';

import { ITEMS_PER_PAGE } from 'app/config/pagination.constants';

@Injectable({ providedIn: 'root' })
export class PaginationConfig {
  constructor(config: NgbPaginationConfig) {
    config.boundaryLinks = true;
    config.maxSize = 100;
    config.pageSize = ITEMS_PER_PAGE;
    config.size = 'sm';
  }
}
