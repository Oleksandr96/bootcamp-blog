import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { AppTagsService } from '../../../services/app-tags.service';
import { Tag } from '../../../interfaces/tag.interface';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit, OnDestroy {
  separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('tagsInput') tagsInput!: ElementRef<HTMLInputElement>;
  @Input() tagCandidate: string = '';
  @Output() newTagEvent = new EventEmitter<Tag[]>();

  tags: Tag[] = [];
  filteredTags!: Observable<Tag[]>;
  @Input('selectedTags') selectedTags: Tag[] = [];

  tagsSub!: Subscription;
  tagsForm = new FormControl();

  constructor(private appTagsService: AppTagsService) {}

  ngOnInit(): void {
    this.tagsSub = this.appTagsService.getAll().subscribe((tags: Tag[]) => {
      this.tags = tags;
      this.filteredTags = this.tagsForm.valueChanges.pipe(
        startWith(null),
        map((tagName: string | null) =>
          tagName ? this._filter(tagName) : this.tags
        )
      );
    });
  }

  ngOnDestroy(): void {
    this.tagsSub.unsubscribe();
  }

  create() {
    const candidate: Tag = {
      name:
        this.tagCandidate.charAt(0).toUpperCase() + this.tagCandidate.slice(1),
    };
    this.appTagsService.create(candidate).subscribe((newTag) => {
      this.tags.push(newTag);
      this.selectedTags.push(newTag);
      this.tagCandidate = '';
      this.newTagEvent.emit(this.selectedTags);
    });
  }

  remove(tag: Tag): void {
    const index = this.selectedTags.findIndex(
      (tagItem: Tag) => tagItem._id == tag._id
    );
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
      this.newTagEvent.emit(this.selectedTags);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (typeof event.option.value === 'object') {
      const isSelected = this.selectedTags.find(
        (tag: Tag) => tag._id === event.option.value._id
      );

      if (!isSelected) {
        this.selectedTags.push(event.option.value);
        this.newTagEvent.emit(this.selectedTags);
      }
    } else this.create();
    this.tagsInput.nativeElement.value = '';
    this.tagsForm.setValue(null);
  }

  private _filter(name: string): Tag[] {
    const filterValue = name.toString().toLowerCase();
    this.tagCandidate = filterValue;
    return this.tags.filter((tag: Tag) =>
      tag.name.toLowerCase().includes(filterValue)
    );
  }
}
