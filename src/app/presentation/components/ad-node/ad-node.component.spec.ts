import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdNodeComponent } from './ad-node.component';

describe('AdNodeComponent', () => {
  let component: AdNodeComponent;
  let fixture: ComponentFixture<AdNodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdNodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
