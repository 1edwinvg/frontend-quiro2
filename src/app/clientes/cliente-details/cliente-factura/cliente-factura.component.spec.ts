import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteFacturaComponent } from './cliente-factura.component';

describe('ClienteFacturaComponent', () => {
  let component: ClienteFacturaComponent;
  let fixture: ComponentFixture<ClienteFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
