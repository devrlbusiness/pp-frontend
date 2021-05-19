import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAsuntoComponent } from './lista-asunto.component';

describe('ListaAsuntoComponent', () => {
  let component: ListaAsuntoComponent;
  let fixture: ComponentFixture<ListaAsuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaAsuntoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAsuntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
