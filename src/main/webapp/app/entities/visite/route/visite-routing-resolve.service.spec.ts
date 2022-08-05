jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IVisite, Visite } from '../visite.model';
import { VisiteService } from '../service/visite.service';

import { VisiteRoutingResolveService } from './visite-routing-resolve.service';

describe('Service Tests', () => {
  describe('Visite routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: VisiteRoutingResolveService;
    let service: VisiteService;
    let resultVisite: IVisite | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(VisiteRoutingResolveService);
      service = TestBed.inject(VisiteService);
      resultVisite = undefined;
    });

    describe('resolve', () => {
      it('should return IVisite returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultVisite = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultVisite).toEqual({ id: 123 });
      });

      it('should return new IVisite if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultVisite = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultVisite).toEqual(new Visite());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Visite })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultVisite = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultVisite).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
