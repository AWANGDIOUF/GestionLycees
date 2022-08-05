jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IReception, Reception } from '../reception.model';
import { ReceptionService } from '../service/reception.service';

import { ReceptionRoutingResolveService } from './reception-routing-resolve.service';

describe('Service Tests', () => {
  describe('Reception routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: ReceptionRoutingResolveService;
    let service: ReceptionService;
    let resultReception: IReception | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(ReceptionRoutingResolveService);
      service = TestBed.inject(ReceptionService);
      resultReception = undefined;
    });

    describe('resolve', () => {
      it('should return IReception returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultReception = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultReception).toEqual({ id: 123 });
      });

      it('should return new IReception if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultReception = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultReception).toEqual(new Reception());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as Reception })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultReception = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultReception).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
