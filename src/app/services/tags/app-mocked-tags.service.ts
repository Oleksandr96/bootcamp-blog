import { Injectable } from '@angular/core';
import { Tag } from '../../interfaces/tag.interface';
import { Observable, of } from 'rxjs';

const TAGS: Tag[] = [
  { _id: 'tag_id_1', name: 'testTag' },
  { _id: 'tag_id_1', name: 'News' },
];

@Injectable()
export class AppMockedTagsService {
  constructor() {}

  public create(tag: Tag): Observable<Tag> {
    return of(TAGS[0]);
  }

  public getAll(): Observable<Tag[]> {
    return of(TAGS);
  }

  public getPopular(): Observable<Tag[]> {
    return of(TAGS);
  }

  public getById(id: string): Observable<Tag> {
    return of(TAGS[0]);
  }
}
