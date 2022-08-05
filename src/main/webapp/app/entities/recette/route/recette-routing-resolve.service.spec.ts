jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IRecette, Recette } from '../recette.model';
import { RecetteService } from '../service/recette.service';

import { RecetteRoutingResolveService } from './recette-routing-resolve.service';

describe('Service Tests', () => {
  describe('Recette routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: RecetteRoutingResolveService;
    let service: RecetteService;
    let resultRecette: IRecette | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(RecetteRoutingResolveService);
      service = TestBed.inject(RecetteService);
      resultRecette = undefined;
    });

    describe('resolve', () => {
      it('should return IRecette returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultRecette = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultRecette).toEqual({ id: 123 });
      });

      it('should return new IRecette if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultRecette = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultRecette).toEqual(new Recette());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Recette })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultRecette = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultRecette).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
