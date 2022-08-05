jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { ILyceeTechnique, LyceeTechnique } from '../lycee-technique.model';
import { LyceeTechniqueService } from '../service/lycee-technique.service';

import { LyceeTechniqueRoutingResolveService } from './lycee-technique-routing-resolve.service';

describe('Service Tests', () => {
  describe('LyceeTechnique routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: LyceeTechniqueRoutingResolveService;
    let service: LyceeTechniqueService;
    let resultLyceeTechnique: ILyceeTechnique | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(LyceeTechniqueRoutingResolveService);
      service = TestBed.inject(LyceeTechniqueService);
      resultLyceeTechnique = undefined;
    });

    describe('resolve', () => {
      it('should return ILyceeTechnique returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLyceeTechnique = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultLyceeTechnique).toEqual({ id: 123 });
      });

      it('should return new ILyceeTechnique if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLyceeTechnique = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultLyceeTechnique).toEqual(new LyceeTechnique());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as LyceeTechnique })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultLyceeTechnique = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultLyceeTechnique).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
