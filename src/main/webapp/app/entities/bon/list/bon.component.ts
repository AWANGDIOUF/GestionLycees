import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBon } from '../bon.model';
import { BonService } from '../service/bon.service';
import { BonDeleteDialogComponent } from '../delete/bon-delete-dialog.component';

@Component({
  selector: 'jhi-bon',
  templateUrl: './bon.component.html',
})
export class BonComponent implements OnInit {
  bons?: IBon[];
  isLoading = false;

  constructor(protected bonService: BonService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.bonService.query().subscribe(
      (res: HttpResponse<IBon[]>) => {
        this.isLoading = false;
        this.bons = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IBon): number {
    return item.id!;
  }

  delete(bon: IBon): void {
    const modalRef = this.modalService.open(BonDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bon = bon;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
