import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from "@angular/core";
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { Hero } from "../hero";

import { HeroService } from "../hero.service";
import { HeroDetailComponent } from "./hero-detail.component";

import { FormsModule } from "@angular/forms";


describe("HeroDetailComponent deep test", () => {
  let fixture: ComponentFixture<HeroDetailComponent>;

  let mockHeroService, mockActivatedRouteService, mockLocation;

  beforeEach(() => {

    mockHeroService = jasmine.createSpyObj(['getHero', "updateHero"]);

    mockLocation = jasmine.createSpyObj(['back']);

    mockActivatedRouteService = {
      snapshot: { paramMap: { get: () => { return '3' } } }
    }

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      imports: [FormsModule],
      providers: [
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRouteService },
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({ id: 3, name: "John 3", strength: 18 }))

  });

  it('should runder hero name in a h2 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector("h2").textContent).toContain('John 3'.toUpperCase())
  })

  it('should call updatehero when save called', fakeAsync(
    () => {

      mockHeroService.updateHero.and.returnValue(of({}))

      fixture.detectChanges();

      fixture.componentInstance.save();

      //tick(250);

      flush();

      expect(mockHeroService.updateHero).toHaveBeenCalled();


    }
  ))




});
