import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { FeedComponent } from './feed.component';
import { AppPostMockedService } from '../../services/posts/app-post-mocked.service';
import { AppPostsService } from '../../services/posts/app-posts.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('FeedPageComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeedComponent],
      providers: [{ provide: AppPostsService, useClass: AppPostMockedService }],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
