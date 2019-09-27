import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUnidadComponent } from './editar-unidad.component';

describe('EditarUnidadComponent', () => {
  let component: EditarUnidadComponent;
  let fixture: ComponentFixture<EditarUnidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarUnidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
