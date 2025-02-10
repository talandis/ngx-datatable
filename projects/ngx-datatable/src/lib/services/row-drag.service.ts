import { EventEmitter, Injectable, Output, Renderer2 } from '@angular/core';
import { RowDropDirective } from '../directives/row-droppable.directive';
import { DataTableBodyRowComponent } from '../components/body/body-row.component';

@Injectable()
export class RowDragService {

  // variable for holding if drag is active at the moment
  // This is important for dynamically setting z-index on drop areas
  // @see body.component.ts
  public dragActive = false;

  /**
   * Event which will be emitted on Drag Start
   */
  @Output() dragStart = new EventEmitter();

  /**
   * Event which will be emitted on Drag End
   */
  @Output() dragEnd = new EventEmitter();

  private currentDropDirective: RowDropDirective = null;
  private row: DataTableBodyRowComponent = null;
  private item: any = null;

  startDrag(row: DataTableBodyRowComponent, item: any) {
    this.row = row;
    this.dragActive = true;
    this.item = item;
    this.dragStart.emit();
  }

  endDrag() {
    this.row = null;
    this.item = null;
    this.dragActive = false;
    this.dragEnd.emit();
    if (this.currentDropDirective !== null) {
      this.currentDropDirective.removeDragOverClass();
      this.currentDropDirective = null;
    }
  }

  public getItem() {
    return this.item;
  }

  setActiveDropElement(dropDirective: RowDropDirective) {

    if (this.currentDropDirective !== dropDirective) {
      if (this.currentDropDirective !== null) {
        this.currentDropDirective.removeDragOverClass();
        this.currentDropDirective = null;
      }
      dropDirective.addDragOverClass();
      this.currentDropDirective = dropDirective;
    }
  }
}
