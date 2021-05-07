import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomEmailControlComponent } from './custom-email-control.component';

describe('CustomEmailControlComponent', () => {
  let component: CustomEmailControlComponent;
  let fixture: ComponentFixture<CustomEmailControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomEmailControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomEmailControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
