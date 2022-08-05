import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IOrgane } from '../organe.model';
import { OrganeService } from '../service/organe.service';
import { OrganeDeleteDialogComponent } from '../delete/organe-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-organe',
  templateUrl: './organe.component.html',
})
export class OrganeComponent implements OnInit {
  organes?: IOrgane[];
  isLoading = false;

  constructor(protected organeService: OrganeService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.organeService.query().subscribe(
      (res: HttpResponse<IOrgane[]>) => {
        this.isLoading = false;
        this.organes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IOrgane): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(organe: IOrgane): void {
    const modalRef = this.modalService.open(OrganeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.organe = organe;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
