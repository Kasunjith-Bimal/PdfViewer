import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleDivComponent } from './sample-div.component';

describe('SampleDivComponent', () => {
  let component: SampleDivComponent;
  let fixture: ComponentFixture<SampleDivComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SampleDivComponent]
    });
    fixture = TestBed.createComponent(SampleDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
