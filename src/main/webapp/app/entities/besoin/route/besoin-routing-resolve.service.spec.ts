jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IBesoin, Besoin } from '../besoin.model';
import { BesoinService } from '../service/besoin.service';

import { BesoinRoutingResolveService } from './besoin-routing-resolve.service';

describe('Service Tests', () => {
  describe('Besoin routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: BesoinRoutingResolveService;
    let service: BesoinService;
    let resultBesoin: IBesoin | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(BesoinRoutingResolveService);
      service = TestBed.inject(BesoinService);
      resultBesoin = undefined;
    });

    describe('resolve', () => {
      it('should return IBesoin returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBesoin = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultBesoin).toEqual({ id: 123 });
      });

      it('should return new IBesoin if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBesoin = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultBesoin).toEqual(new Besoin());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Besoin })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultBesoin = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultBesoin).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
