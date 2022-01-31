import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedPostsComponent } from './liked-posts.component';
import { AppPostsService } from '../../../services/posts/app-posts.service';
import { AppPostMockedService } from '../../../services/posts/app-post-mocked.service';
import { AppUserService } from '../../../services/user/app-user.service';
import { AppUserMockedService } from '../../../services/user/app-user-mocked.service';

describe('LikedPostsComponent', () => {
  let component: LikedPostsComponent;
  let fixture: ComponentFixture<LikedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikedPostsComponent],
      providers: [
        {
          provide: AppPostsService,
          useClass: AppPostMockedService,
        },
        {
          provide: AppUserService,
          useClass: AppUserMockedService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
