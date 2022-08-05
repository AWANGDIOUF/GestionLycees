jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IOrganeGestion, OrganeGestion } from '../organe-gestion.model';
import { OrganeGestionService } from '../service/organe-gestion.service';

import { OrganeGestionRoutingResolveService } from './organe-gestion-routing-resolve.service';

describe('Service Tests', () => {
  describe('OrganeGestion routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: OrganeGestionRoutingResolveService;
    let service: OrganeGestionService;
    let resultOrganeGestion: IOrganeGestion | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(OrganeGestionRoutingResolveService);
      service = TestBed.inject(OrganeGestionService);
      resultOrganeGestion = undefined;
    });

    describe('resolve', () => {
      it('should return IOrganeGestion returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultOrganeGestion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultOrganeGestion).toEqual({ id: 123 });
      });

      it('should return new IOrganeGestion if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultOrganeGestion = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultOrganeGestion).toEqual(new OrganeGestion());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as OrganeGestion })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultOrganeGestion = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultOrganeGestion).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
