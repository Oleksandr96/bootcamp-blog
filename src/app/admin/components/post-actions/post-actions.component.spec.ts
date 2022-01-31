import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostActionsComponent } from './post-actions.component';
import { MaterialModule } from '../../../shared/material/material.module';

describe('PostActionsComponent', () => {
  let component: PostActionsComponent;
  let fixture: ComponentFixture<PostActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostActionsComponent],
      imports: [MaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
