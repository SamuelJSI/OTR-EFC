import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatedrivenFormComponent } from './templatedriven-form.component';

describe('TemplatedrivenFormComponent', () => {
  let component: TemplatedrivenFormComponent;
  let fixture: ComponentFixture<TemplatedrivenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatedrivenFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatedrivenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
