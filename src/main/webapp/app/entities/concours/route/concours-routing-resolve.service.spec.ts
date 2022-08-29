jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IConcours, Concours } from '../concours.model';
import { ConcoursService } from '../service/concours.service';

import { ConcoursRoutingResolveService } from './concours-routing-resolve.service';

describe('Service Tests', () => {
  describe('Concours routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ConcoursRoutingResolveService;
    let service: ConcoursService;
    let resultConcours: IConcours | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ConcoursRoutingResolveService);
      service = TestBed.inject(ConcoursService);
      resultConcours = undefined;
    });

    describe('resolve', () => {
      it('should return IConcours returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultConcours = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultConcours).toEqual({ id: 123 });
      });

      it('should return new IConcours if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultConcours = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultConcours).toEqual(new Concours());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Concours })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultConcours = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultConcours).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
