import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioCursosComponent } from './inicio-cursos.component';

describe('InicioCursosComponent', () => {
  let component: InicioCursosComponent;
  let fixture: ComponentFixture<InicioCursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioCursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
