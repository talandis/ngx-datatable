import { Component, OnInit } from '@angular/core';
import { ColumnMode } from 'projects/ngx-datatable/src/public-api';
import RowDropEvent from '../../../projects/ngx-datatable/src/lib/utils/row-drop-event';

@Component({
  selector: 'drag-drop-sorting-demo',
  template: `
    <div>
      <h3>
        Drag & Drop sorting
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/src/app/sorting/sorting-drag-drop.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="50"
        [rowsDraggable]="true"
        (rowDropped)="onDrop($event)"
      >
        <ngx-datatable-column name="Company">
          <ng-template let-row="row" ngx-datatable-cell-template>
            {{ row.company }}
          </ng-template>
        </ngx-datatable-column>

        <ngx-datatable-column name="Name">
          <ng-template let-row="row" ngx-datatable-cell-template>
            {{ row.name }}
          </ng-template>
        </ngx-datatable-column>

        <ngx-datatable-column name="Gender"></ngx-datatable-column>
      </ngx-datatable>
    </div>
  `
})
export class DragDropSortingComponent implements OnInit {
  rows = [];

  ColumnMode = ColumnMode;

  ngOnInit() {
    this.fetch(data => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      const data = JSON.parse(req.response);
      cb(data);
    };

    req.send();
  }

  onDrop(event: RowDropEvent) {
    console.log(event);
  }
}
