import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAsuntoComponent } from './nuevo-asunto.component';

describe('NuevoAsuntoComponent', () => {
  let component: NuevoAsuntoComponent;
  let fixture: ComponentFixture<NuevoAsuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAsuntoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAsuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
