import { Component, Directive, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { Hero } from "../hero";

import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { HeroesComponent } from "./heroes.component";

@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;

  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe("HeroesComponent deep test", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "John", strength: 5 },
      { id: 2, name: "John 2", strength: 8 },
      { id: 3, name: "John 3", strength: 18 },
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', "addHero", "deleteHero"]);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent,
        RouterLinkDirectiveStub],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
      //khong bao loi khi co cac phan tu khong xac dinh nhu: ngIf, RouterLink, vv.v.v.v
    })

    fixture = TestBed.createComponent(HeroesComponent);

  });

  it("should render each hero as a hero component", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //run ngOnInit
    fixture.detectChanges();

    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));

    expect(heroComponent.length).toBe(3);
    expect(heroComponent[0].componentInstance.hero.name).toBe("John");
  })

  it('should call heroservie.deletehero when the hero component delete button is clicked call to nativeElement', () => {

    spyOn(fixture.componentInstance, 'delete');

    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //run ngOnInit
    fixture.detectChanges();

    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));

    heroComponent[0].query(By.css('button')).triggerEventHandler('click', { stopPropagation: () => { } });

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  })

  // call to nativeElement
  it('should call heroservie.deletehero when the hero component emit delete event', () => {

    spyOn(fixture.componentInstance, 'delete');

    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //run ngOnInit
    fixture.detectChanges();

    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));

    (<HeroComponent>heroComponent[0].componentInstance).delete.emit();

    //heroComponent[0].triggerEventHandler('delete', null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  })

  it('should add a new hero to he hero list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //run ngOnInit
    fixture.detectChanges();

    const name = "Duy";

    mockHeroService.addHero.and.returnValue(of({ id: 5, name: name, strength: 100 }));

    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const buttonElement = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;

    buttonElement.triggerEventHandler("click", null);

    // fixture.componentInstance.add(name);

    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });

  it('should have the correct route for first hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    //run ngOnInit
    fixture.detectChanges();

    const heroComponent = fixture.debugElement.queryAll(By.directive(HeroComponent));

    let routerLink = heroComponent[0].query(By.directive(RouterLinkDirectiveStub)).injector.get(RouterLinkDirectiveStub);


    heroComponent[0].query(By.css('a')).triggerEventHandler('click', null);

    expect(routerLink.navigatedTo).toBe("/detail/1");


  });

});
