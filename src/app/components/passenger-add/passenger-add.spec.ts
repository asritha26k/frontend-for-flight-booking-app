import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerAdd } from './passenger-add';

describe('PassengerAdd', () => {
  let component: PassengerAdd;
  let fixture: ComponentFixture<PassengerAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PassengerAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerAdd);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
