jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IAttribution, Attribution } from '../attribution.model';
import { AttributionService } from '../service/attribution.service';

import { AttributionRoutingResolveService } from './attribution-routing-resolve.service';

describe('Service Tests', () => {
  describe('Attribution routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: AttributionRoutingResolveService;
    let service: AttributionService;
    let resultAttribution: IAttribution | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(AttributionRoutingResolveService);
      service = TestBed.inject(AttributionService);
      resultAttribution = undefined;
    });

    describe('resolve', () => {
      it('should return IAttribution returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAttribution = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAttribution).toEqual({ id: 123 });
      });

      it('should return new IAttribution if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAttribution = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultAttribution).toEqual(new Attribution());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Attribution })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultAttribution = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultAttribution).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
