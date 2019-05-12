import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarFacturasIdComponent } from './buscar-facturas-id.component';

describe('BuscarFacturasIdComponent', () => {
  let component: BuscarFacturasIdComponent;
  let fixture: ComponentFixture<BuscarFacturasIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarFacturasIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarFacturasIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
