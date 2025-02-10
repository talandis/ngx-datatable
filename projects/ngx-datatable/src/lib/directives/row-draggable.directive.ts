import {
  ContentChild, Directive, EventEmitter,
  HostBinding, HostListener, Input, Output, ViewChild
} from '@angular/core';
import { RowDragService } from '../services/row-drag.service';
import { DataTableBodyRowComponent } from '../components/body/body-row.component';

export interface DraggableOptions {
  zone?: string;
  data?: any;
}

@Directive({
  selector: '[row-draggable]'
})
export class RowDraggableDirective {

  @ContentChild(DataTableBodyRowComponent, { static: false }) row: DataTableBodyRowComponent;
  @Output() dragStartEvent = new EventEmitter();
  @Input() dragEnabled: boolean;
  @Input() dragData: any;
  @Input() dragItem: any;

  constructor(private dragService: RowDragService) {

  }

  @HostBinding('draggable')
  get draggable() {
    return this.dragEnabled;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent) {
    this.dragService.startDrag(this.row, this.dragItem);
    event.dataTransfer.setData('data', this.dragData);
  }
}
