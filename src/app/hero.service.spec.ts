import { inject, TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

describe("HeroeService test", () => {

  let mockMessageService;

  let httpTestingController: HttpTestingController;

  let service: HeroService;

  beforeEach(() => {

    mockMessageService = jasmine.createSpyObj(["add"]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(HeroService);


  });

  describe("getHero", () => {
    it('should call get with the coorect url', () => {
      //call getHero()
      service.getHero(1).subscribe();
      //test that the url

      const req = httpTestingController.expectOne('api/heroes/1')

      req.flush({ id: 1, name: 'John', strength: 5 });

      expect(req.request.method).toBe('GET');

      httpTestingController.verify();
    }
    );
  })
});
