import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "./hero.component";

describe("HeroComponent shallow test", () => {
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(HeroComponent);

  });

  it('shoud have the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: "John", strength: 5 };

    fixture.detectChanges();

    expect(fixture.componentInstance.hero.name).toEqual('John');
  });

  it('shoud render the hero name in an anchor tag the correct hero', () => {
    fixture.componentInstance.hero = { id: 1, name: "John", strength: 5 };

    fixture.detectChanges();

    //expect(fixture.debugElement.query(By.css('a')).nativeElement.textContent).toEqual('John');

    expect(fixture.nativeElement.querySelector('a').textContent).toContain('John');
  })


});
