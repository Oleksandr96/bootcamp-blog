import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsComponent } from './publications.component';
import { AppPostsService } from '../../../services/posts/app-posts.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppPostMockedService } from '../../../services/posts/app-post-mocked.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PublicationsComponent', () => {
  let component: PublicationsComponent;
  let fixture: ComponentFixture<PublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicationsComponent],
      providers: [{ provide: AppPostsService, useClass: AppPostMockedService }],
      imports: [MatSnackBarModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
