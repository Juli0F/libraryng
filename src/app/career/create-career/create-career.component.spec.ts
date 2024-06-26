import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCareerComponent } from './create-career.component';

describe('CreateCareerComponent', () => {
  let component: CreateCareerComponent;
  let fixture: ComponentFixture<CreateCareerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCareerComponent]
    });
    fixture = TestBed.createComponent(CreateCareerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
