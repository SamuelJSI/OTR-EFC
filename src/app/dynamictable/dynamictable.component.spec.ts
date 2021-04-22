import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamictableComponent } from './dynamictable.component';

describe('DynamictableComponent', () => {
  let component: DynamictableComponent;
  let fixture: ComponentFixture<DynamictableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamictableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamictableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
