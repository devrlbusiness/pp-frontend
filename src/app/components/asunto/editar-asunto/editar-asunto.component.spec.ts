import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAsuntoComponent } from './editar-asunto.component';

describe('EditarAsuntoComponent', () => {
  let component: EditarAsuntoComponent;
  let fixture: ComponentFixture<EditarAsuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAsuntoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAsuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
