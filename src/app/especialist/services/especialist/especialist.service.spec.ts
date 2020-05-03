import { TestBed } from "@angular/core/testing";

import { EspecialistService } from "./especialist.service";

describe("EspecialistService", () => {
  let service: EspecialistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspecialistService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
