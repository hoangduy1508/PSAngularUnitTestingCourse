import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe("HeroesComponent test", () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "John", strength: 5 },
      { id: 2, name: "John 2", strength: 8 },
      { id: 3, name: "John 3", strength: 18 },
    ]

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroService);
  });

  describe('deleteHero', () => {
    it('should remove the hero from the list', () => {

      mockHeroService.deleteHero.and.returnValue(of(true));

      component.heroes = HEROES;

      component.delete(HEROES[0]);

      expect(component.heroes.length).toBe(2);
    })

    it('should call deltehero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      component.delete(HEROES[0]);

      expect(mockHeroService.deleteHero).toHaveBeenCalled();
      //expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[0]);
    })
  })
});
