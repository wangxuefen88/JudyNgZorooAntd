import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyeditdemoComponent } from './myeditdemo.component';

describe('MyeditdemoComponent', () => {
  let component: MyeditdemoComponent;
  let fixture: ComponentFixture<MyeditdemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyeditdemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyeditdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
