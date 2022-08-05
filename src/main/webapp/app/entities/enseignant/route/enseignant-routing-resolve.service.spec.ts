jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IEnseignant, Enseignant } from '../enseignant.model';
import { EnseignantService } from '../service/enseignant.service';

import { EnseignantRoutingResolveService } from './enseignant-routing-resolve.service';

describe('Service Tests', () => {
  describe('Enseignant routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: EnseignantRoutingResolveService;
    let service: EnseignantService;
    let resultEnseignant: IEnseignant | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(EnseignantRoutingResolveService);
      service = TestBed.inject(EnseignantService);
      resultEnseignant = undefined;
    });

    describe('resolve', () => {
      it('should return IEnseignant returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEnseignant = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEnseignant).toEqual({ id: 123 });
      });

      it('should return new IEnseignant if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEnseignant = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultEnseignant).toEqual(new Enseignant());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Enseignant })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultEnseignant = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultEnseignant).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
