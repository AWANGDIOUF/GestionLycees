jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IDepense, Depense } from '../depense.model';
import { DepenseService } from '../service/depense.service';

import { DepenseRoutingResolveService } from './depense-routing-resolve.service';

describe('Service Tests', () => {
  describe('Depense routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: DepenseRoutingResolveService;
    let service: DepenseService;
    let resultDepense: IDepense | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(DepenseRoutingResolveService);
      service = TestBed.inject(DepenseService);
      resultDepense = undefined;
    });

    describe('resolve', () => {
      it('should return IDepense returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDepense = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDepense).toEqual({ id: 123 });
      });

      it('should return new IDepense if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDepense = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultDepense).toEqual(new Depense());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Depense })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDepense = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDepense).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
