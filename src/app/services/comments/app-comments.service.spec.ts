import { inject, TestBed } from '@angular/core/testing';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { AppCommentsService } from './app-comments.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('Comments Service', () => {
  let httpMock: HttpTestingController;
  let service: AppCommentsService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        AppCommentsService,
        HttpClientTestingModule,
        HttpTestingController,
        HttpClient,
        HttpHandler,
      ],
    });
    service = TestBed.inject(AppCommentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    //httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
