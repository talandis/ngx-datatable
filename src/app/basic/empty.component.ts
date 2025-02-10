import { Component } from '@angular/core';
import { ColumnMode } from 'projects/ngx-datatable/src/public-api';

@Component({
  selector: 'empty-demo',
  template: `
    <div>
      <h3>
        Custom Empty Component
        <small>
          <a
            href="https://github.com/siemens/ngx-datatable/blob/master/src/app/basic/empty.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="[]"
        [columns]="columns"
        [columnMode]="ColumnMode.force"
        [headerHeight]="50"
        [footerHeight]="50"
      >
        <div empty-content style="text-align: center;">My custom empty component<br />uses two lines.</div>
      </ngx-datatable>
    </div>
  `
})
export class BasicEmptyComponent {
  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company', sortable: false }];
  ColumnMode = ColumnMode;
}
