import { Component, OnInit } from '@angular/core';
import { AppTagsService } from '../../../services/app-tags.service';
import { Tag } from '../../../interfaces/tag.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  tags!: Tag[];

  constructor(private appTagService: AppTagsService) {}

  ngOnInit(): void {
    this.getPopular();
  }

  public getPopular(): any {
    return this.appTagService
      .getPopular()
      .subscribe((tags) => (this.tags = tags));
  }
}
