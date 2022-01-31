import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormComponent } from './post-form.component';
import { AppPostsService } from '../../../services/posts/app-posts.service';
import { AppPostMockedService } from '../../../services/posts/app-post-mocked.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '../../../shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostFormComponent],
      imports: [RouterTestingModule, MaterialModule, BrowserAnimationsModule],
      providers: [{ provide: AppPostsService, useClass: AppPostMockedService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize PostForm', () => {
    expect(component.postForm).toBeTruthy();
  });

  it('Post form invalid when empty', () => {
    expect(component.postForm.valid).toBeFalsy();
  });

  it('Title validation', () => {
    let err: any = {};
    let title = component.postForm.controls['title'];
    expect(title.valid).toBeFalsy();

    err = title.errors || {};
    expect(err['required']).toBeTruthy();

    title.setValue('Some');
    err = title.errors || {};
    expect(err['minlength']).toBeTruthy();
    expect(err['required']).toBeFalsy();

    title.setValue('Some test title');
    err = title.errors || {};
    expect(err['minlength']).toBeFalsy();
    expect(err['required']).toBeFalsy();
  });

  it('should be valid filled post form', () => {
    expect(component.postForm.valid).toBeFalsy();
    component.postForm.controls['title'].setValue('Some test title');
    component.postForm.controls['shortDescription'].setValue(
      'Some test description'
    );
    component.postForm.controls['content'].setValue(
      'content content content content'
    );
    expect(component.postForm.valid).toBeTruthy();
  });
});
