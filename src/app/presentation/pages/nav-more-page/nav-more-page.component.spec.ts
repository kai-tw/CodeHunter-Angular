import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMorePageComponent } from './nav-more-page.component';

describe('NavMorePageComponent', () => {
  let component: NavMorePageComponent;
  let fixture: ComponentFixture<NavMorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMorePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavMorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
