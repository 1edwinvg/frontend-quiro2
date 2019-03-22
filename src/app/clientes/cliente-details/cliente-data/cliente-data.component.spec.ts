import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDataComponent } from './cliente-data.component';

describe('ClienteDataComponent', () => {
  let component: ClienteDataComponent;
  let fixture: ComponentFixture<ClienteDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
