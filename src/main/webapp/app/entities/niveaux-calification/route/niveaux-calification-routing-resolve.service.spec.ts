jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { INiveauxCalification, NiveauxCalification } from '../niveaux-calification.model';
import { NiveauxCalificationService } from '../service/niveaux-calification.service';

import { NiveauxCalificationRoutingResolveService } from './niveaux-calification-routing-resolve.service';

describe('Service Tests', () => {
  describe('NiveauxCalification routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: NiveauxCalificationRoutingResolveService;
    let service: NiveauxCalificationService;
    let resultNiveauxCalification: INiveauxCalification | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(NiveauxCalificationRoutingResolveService);
      service = TestBed.inject(NiveauxCalificationService);
      resultNiveauxCalification = undefined;
    });

    describe('resolve', () => {
      it('should return INiveauxCalification returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultNiveauxCalification = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultNiveauxCalification).toEqual({ id: 123 });
      });

      it('should return new INiveauxCalification if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultNiveauxCalification = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultNiveauxCalification).toEqual(new NiveauxCalification());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as NiveauxCalification })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultNiveauxCalification = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultNiveauxCalification).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
