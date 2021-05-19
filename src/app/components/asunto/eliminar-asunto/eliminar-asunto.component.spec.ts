import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAsuntoComponent } from './eliminar-asunto.component';

describe('EliminarAsuntoComponent', () => {
  let component: EliminarAsuntoComponent;
  let fixture: ComponentFixture<EliminarAsuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliminarAsuntoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarAsuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
