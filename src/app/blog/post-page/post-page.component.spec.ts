import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PostPageComponent } from './post-page.component';
import { AppPostMockedService } from '../../services/posts/app-post-mocked.service';
import { AppUserService } from '../../services/user/app-user.service';
import { AppPostsService } from '../../services/posts/app-posts.service';
import { AppUserMockedService } from '../../services/user/app-user-mocked.service';
import { MaterialModule } from '../../shared/material/material.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('PostPageComponent', () => {
  let component: PostPageComponent;
  let fixture: ComponentFixture<PostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostPageComponent],
      providers: [
        { provide: AppPostsService, useClass: AppPostMockedService },
        { provide: AppUserService, useClass: AppUserMockedService },
      ],

      imports: [RouterTestingModule, MaterialModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
