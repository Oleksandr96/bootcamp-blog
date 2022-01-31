import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsComponent } from './tags.component';
import { AppTagsService } from '../../../services/tags/app-tags.service';
import { AppMockedTagsService } from '../../../services/tags/app-mocked-tags.service';
import { MaterialModule } from '../../../shared/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TagsComponent', () => {
  let component: TagsComponent;
  let fixture: ComponentFixture<TagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TagsComponent],
      providers: [{ provide: AppTagsService, useClass: AppMockedTagsService }],
      imports: [MaterialModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
