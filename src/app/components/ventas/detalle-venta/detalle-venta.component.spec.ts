import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVentaComponent } from './detalle-venta.component';

describe('DetalleVentaComponent', () => {
  let component: DetalleVentaComponent;
  let fixture: ComponentFixture<DetalleVentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleVentaComponent]
    });
    fixture = TestBed.createComponent(DetalleVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
