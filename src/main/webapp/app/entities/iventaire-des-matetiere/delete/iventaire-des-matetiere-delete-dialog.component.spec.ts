jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IventaireDesMatetiereService } from '../service/iventaire-des-matetiere.service';

import { IventaireDesMatetiereDeleteDialogComponent } from './iventaire-des-matetiere-delete-dialog.component';

describe('Component Tests', () => {
  describe('IventaireDesMatetiere Management Delete Component', () => {
    let comp: IventaireDesMatetiereDeleteDialogComponent;
    let fixture: ComponentFixture<IventaireDesMatetiereDeleteDialogComponent>;
    let service: IventaireDesMatetiereService;
    let mockActiveModal: NgbActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [IventaireDesMatetiereDeleteDialogComponent],
        providers: [NgbActiveModal],
      })
        .overrideTemplate(IventaireDesMatetiereDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(IventaireDesMatetiereDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(IventaireDesMatetiereService);
      mockActiveModal = TestBed.inject(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({})));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        jest.spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.close).not.toHaveBeenCalled();
        expect(mockActiveModal.dismiss).toHaveBeenCalled();
      });
    });
  });
});
