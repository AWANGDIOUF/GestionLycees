jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { INiveauxEtudes, NiveauxEtudes } from '../niveaux-etudes.model';
import { NiveauxEtudesService } from '../service/niveaux-etudes.service';

import { NiveauxEtudesRoutingResolveService } from './niveaux-etudes-routing-resolve.service';

describe('Service Tests', () => {
  describe('NiveauxEtudes routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: NiveauxEtudesRoutingResolveService;
    let service: NiveauxEtudesService;
    let resultNiveauxEtudes: INiveauxEtudes | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(NiveauxEtudesRoutingResolveService);
      service = TestBed.inject(NiveauxEtudesService);
      resultNiveauxEtudes = undefined;
    });

    describe('resolve', () => {
      it('should return INiveauxEtudes returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultNiveauxEtudes = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultNiveauxEtudes).toEqual({ id: 123 });
      });

      it('should return new INiveauxEtudes if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultNiveauxEtudes = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultNiveauxEtudes).toEqual(new NiveauxEtudes());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as NiveauxEtudes })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultNiveauxEtudes = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultNiveauxEtudes).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
