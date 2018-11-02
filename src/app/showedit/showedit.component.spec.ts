import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoweditComponent } from './showedit.component';

describe('ShoweditComponent', () => {
  let component: ShoweditComponent;
  let fixture: ComponentFixture<ShoweditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoweditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoweditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
