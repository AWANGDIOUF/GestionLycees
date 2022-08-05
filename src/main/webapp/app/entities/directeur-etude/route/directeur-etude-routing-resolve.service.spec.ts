jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IDirecteurEtude, DirecteurEtude } from '../directeur-etude.model';
import { DirecteurEtudeService } from '../service/directeur-etude.service';

import { DirecteurEtudeRoutingResolveService } from './directeur-etude-routing-resolve.service';

describe('Service Tests', () => {
  describe('DirecteurEtude routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: DirecteurEtudeRoutingResolveService;
    let service: DirecteurEtudeService;
    let resultDirecteurEtude: IDirecteurEtude | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(DirecteurEtudeRoutingResolveService);
      service = TestBed.inject(DirecteurEtudeService);
      resultDirecteurEtude = undefined;
    });

    describe('resolve', () => {
      it('should return IDirecteurEtude returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDirecteurEtude = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDirecteurEtude).toEqual({ id: 123 });
      });

      it('should return new IDirecteurEtude if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDirecteurEtude = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultDirecteurEtude).toEqual(new DirecteurEtude());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as DirecteurEtude })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultDirecteurEtude = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultDirecteurEtude).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
