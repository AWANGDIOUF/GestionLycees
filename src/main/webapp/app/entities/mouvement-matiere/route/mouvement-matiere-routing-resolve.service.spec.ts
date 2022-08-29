jest.mock('@angular/router');

import { TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { IMouvementMatiere, MouvementMatiere } from '../mouvement-matiere.model';
import { MouvementMatiereService } from '../service/mouvement-matiere.service';

import { MouvementMatiereRoutingResolveService } from './mouvement-matiere-routing-resolve.service';

describe('Service Tests', () => {
  describe('MouvementMatiere routing resolve service', () => {
    let mockRouter: Router;
    let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
    let routingResolveService: MouvementMatiereRoutingResolveService;
    let service: MouvementMatiereService;
    let resultMouvementMatiere: IMouvementMatiere | undefined;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [Router, ActivatedRouteSnapshot],
      });
      mockRouter = TestBed.inject(Router);
      mockActivatedRouteSnapshot = TestBed.inject(ActivatedRouteSnapshot);
      routingResolveService = TestBed.inject(MouvementMatiereRoutingResolveService);
      service = TestBed.inject(MouvementMatiereService);
      resultMouvementMatiere = undefined;
    });

    describe('resolve', () => {
      it('should return IMouvementMatiere returned by find', () => {
        // GIVEN
        service.find = jest.fn(id => of(new HttpResponse({ body: { id } })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMouvementMatiere = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMouvementMatiere).toEqual({ id: 123 });
      });

      it('should return new IMouvementMatiere if id is not provided', () => {
        // GIVEN
        service.find = jest.fn();
        mockActivatedRouteSnapshot.params = {};

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMouvementMatiere = result;
        });

        // THEN
        expect(service.find).not.toBeCalled();
        expect(resultMouvementMatiere).toEqual(new MouvementMatiere());
      });

      it('should route to 404 page if data not found in server', () => {
        // GIVEN
        jest.spyOn(service, 'find').mockReturnValue(of(new HttpResponse({ body: null as unknown as MouvementMatiere })));
        mockActivatedRouteSnapshot.params = { id: 123 };

        // WHEN
        routingResolveService.resolve(mockActivatedRouteSnapshot).subscribe(result => {
          resultMouvementMatiere = result;
        });

        // THEN
        expect(service.find).toBeCalledWith(123);
        expect(resultMouvementMatiere).toEqual(undefined);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['404']);
      });
    });
  });
});
