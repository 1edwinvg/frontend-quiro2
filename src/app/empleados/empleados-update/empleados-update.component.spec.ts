import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosUpdateComponent } from './empleados-update.component';

describe('EmpleadosUpdateComponent', () => {
  let component: EmpleadosUpdateComponent;
  let fixture: ComponentFixture<EmpleadosUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadosUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadosUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
