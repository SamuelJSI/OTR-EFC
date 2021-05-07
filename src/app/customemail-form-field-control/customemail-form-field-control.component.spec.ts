import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomemailFormFieldControlComponent } from './customemail-form-field-control.component';

describe('CustomemailFormFieldControlComponent', () => {
  let component: CustomemailFormFieldControlComponent;
  let fixture: ComponentFixture<CustomemailFormFieldControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomemailFormFieldControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomemailFormFieldControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
