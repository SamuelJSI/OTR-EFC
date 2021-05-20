import { DataSource } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'wex-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  private listConfig: ListConfig;
  public currengPage: number;
  public pageSize: number;
  public pageStart: number;
  public listItems: Array<any>;
  public displayedAttributes: Array<string>;

  @Input()
  public set config(config: ListConfig) {
    this.listConfig = new ListConfig(config);
    this.pageStart = 0;
    this.pageSize = 10;
    this.displayedAttributes = this.getDisplayedAttributes(config);
    this.listItems = this.paginateItems(
      this.listConfig.source,
      this.pageStart,
      this.pageSize
    );
  }

  public get config() {
    return this.listConfig;
  }

  public get totalItems() {
    if (
      this.listConfig &&
      this.listConfig.source &&
      this.listConfig.source.length
    ) {
      return this.listConfig.source.length;
    }
    return 0;
  }

  public get pageSizeOptions() {
    return [5, 10, 25, 100];
  }

  constructor() {
    this.pageStart = 0;
    this.pageSize = 10;
    this.listItems = [];
    this.displayedAttributes = [];
  }

  public paginateItems(items: any[], start: number, end: number): any[] {
    items = items.slice();
    start = start > 0 ? start : 0;
    end = end < items.length ? end : items.length;
    return items.slice(start, end);
  }

  public onPageChange(event: any) {
    const currentPage = event.pageIndex ? event.pageIndex : 0;
    const startIndex = currentPage * event.pageSize;
    this.listItems = this.paginateItems(
      this.listConfig.source,
      startIndex,
      startIndex + event.pageSize
    );
  }

  public getDisplayedAttributes(config: ListConfig): string[] {
    const displayedAttributes: any = [];
    if (Array.isArray(config.attributes)) {
      for (const attribute of config.attributes) {
        displayedAttributes.push(attribute.source);
      }
    }
    return displayedAttributes;
  }
}

export type Layout = 'GRID' | 'LIST';

export class ListConfig {
  public title: string;
  public layout?: Layout;
  public source: Array<any>;
  public primayAttribute?: string;
  public attributes: Array<Attribute>;

  constructor(config: ListConfig) {
    this.title = config.title ? config.title : 'List';
    this.primayAttribute = config.primayAttribute ? config.primayAttribute : '';
    this.layout = config.layout ? config.layout : 'LIST';
    this.source = config.source ? config.source : [];

    this.attributes = [];
    if (Array.isArray(config.attributes)) {
      for (const [index, attribute] of config.attributes.entries()) {
        if (!this.primayAttribute && index == 0) {
          this.primayAttribute = attribute.source;
        }
        this.attributes.push(
          new Attribute({
            label: attribute.label,
            source: attribute.source,
          })
        );
      }
    }
    console.log(this);
    
  }
}

export class Attribute {
  public label: string;
  public source: string;
  constructor(attribute: Attribute) {
    this.label = attribute.label;
    this.source = attribute.source;
  }
}
