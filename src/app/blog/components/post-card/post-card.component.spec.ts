import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCardComponent } from './post-card.component';
import { AppPostsService } from '../../../services/posts/app-posts.service';
import { AppPostMockedService } from '../../../services/posts/app-post-mocked.service';
import { AppUserService } from '../../../services/user/app-user.service';
import { AppUserMockedService } from '../../../services/user/app-user-mocked.service';
import { MaterialModule } from '../../../shared/material/material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PostCardComponent', () => {
  let component: PostCardComponent;
  let fixture: ComponentFixture<PostCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostCardComponent],
      providers: [
        { provide: AppPostsService, useClass: AppPostMockedService },
        { provide: AppUserService, useClass: AppUserMockedService },
      ],
      imports: [MaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
