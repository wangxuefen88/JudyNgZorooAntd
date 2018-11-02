import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TreeContrutsComponent } from './tree-contruts.component';

describe('TreeContrutsComponent', () => {
  let component: TreeContrutsComponent;
  let fixture: ComponentFixture<TreeContrutsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeContrutsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreeContrutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
