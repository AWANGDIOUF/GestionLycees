jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IExamen, Examen } from '../examen.model';
import { ExamenService } from '../service/examen.service';

import { ExamenRoutingResolveService } from './examen-routing-resolve.service';

describe('Service Tests', () => {
  describe('Examen routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ExamenRoutingResolveService;
    let service: ExamenService;
    let resultExamen: IExamen | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ExamenRoutingResolveService);
      service = TestBed.inject(ExamenService);
      resultExamen = undefined;
    });

    describe('resolve', () => {
      it('should return IExamen returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultExamen = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultExamen).toEqual({ id: 123 });
      });

      it('should return new IExamen if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultExamen = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultExamen).toEqual(new Examen());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Examen })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultExamen = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultExamen).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
