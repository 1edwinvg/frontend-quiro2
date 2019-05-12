import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarFacturasClienteComponent } from './buscar-facturas-cliente.component';

describe('BuscarFacturasClienteComponent', () => {
  let component: BuscarFacturasClienteComponent;
  let fixture: ComponentFixture<BuscarFacturasClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarFacturasClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarFacturasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
