jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IDifficulte, Difficulte } from '../difficulte.model';
import { DifficulteService } from '../service/difficulte.service';

import { DifficulteRoutingResolveService } from './difficulte-routing-resolve.service';

describe('Service Tests', () => {
  describe('Difficulte routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: DifficulteRoutingResolveService;
    let service: DifficulteService;
    let resultDifficulte: IDifficulte | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(DifficulteRoutingResolveService);
      service = TestBed.inject(DifficulteService);
      resultDifficulte = undefined;
    });

    describe('resolve', () => {
      it('should return IDifficulte returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDifficulte = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDifficulte).toEqual({ id: 123 });
      });

      it('should return new IDifficulte if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDifficulte = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultDifficulte).toEqual(new Difficulte());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Difficulte })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDifficulte = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDifficulte).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
