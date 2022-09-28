import { Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";

import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";

describe("HeroesComponent shallow test", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let HEROES;
  let mockHeroService;

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
  }
  beforeEach(() => {
    HEROES = [
      { id: 1, name: "John", strength: 5 },
      { id: 2, name: "John 2", strength: 8 },
      { id: 3, name: "John 3", strength: 18 },
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', "addHero", "deleteHero"]);

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ]
    })

    fixture = TestBed.createComponent(HeroesComponent);

  });

  it('shoud set heroes correctly from the service', () => {
    console.log(mockHeroService);
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    expect(fixture.componentInstance.heroes).toBe(HEROES);
  });

  it("should create one li for each hero", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css("li")).length).toBe(3);
  })

});
