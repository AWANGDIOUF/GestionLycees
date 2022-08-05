import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProbleme } from '../probleme.model';
import { ProblemeService } from '../service/probleme.service';
import { ProblemeDeleteDialogComponent } from '../delete/probleme-delete-dialog.component';
import { DataUtils } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-probleme',
  templateUrl: './probleme.component.html',
})
export class ProblemeComponent implements OnInit {
  problemes?: IProbleme[];
  isLoading = false;

  constructor(protected problemeService: ProblemeService, protected dataUtils: DataUtils, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.problemeService.query().subscribe(
      (res: HttpResponse<IProbleme[]>) => {
        this.isLoading = false;
        this.problemes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IProbleme): number {
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    return this.dataUtils.openFile(base64String, contentType);
  }

  delete(probleme: IProbleme): void {
    const modalRef = this.modalService.open(ProblemeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.probleme = probleme;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
