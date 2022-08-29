jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IPersonnelAdministratif, PersonnelAdministratif } from '../personnel-administratif.model';
import { PersonnelAdministratifService } from '../service/personnel-administratif.service';

import { PersonnelAdministratifRoutingResolveService } from './personnel-administratif-routing-resolve.service';

describe('Service Tests', () => {
  describe('PersonnelAdministratif routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: PersonnelAdministratifRoutingResolveService;
    let service: PersonnelAdministratifService;
    let resultPersonnelAdministratif: IPersonnelAdministratif | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(PersonnelAdministratifRoutingResolveService);
      service = TestBed.inject(PersonnelAdministratifService);
      resultPersonnelAdministratif = undefined;
    });

    describe('resolve', () => {
      it('should return IPersonnelAdministratif returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPersonnelAdministratif = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPersonnelAdministratif).toEqual({ id: 123 });
      });

      it('should return new IPersonnelAdministratif if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPersonnelAdministratif = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultPersonnelAdministratif).toEqual(new PersonnelAdministratif());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as PersonnelAdministratif })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultPersonnelAdministratif = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultPersonnelAdministratif).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
