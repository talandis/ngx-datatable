import {
  Output, EventEmitter, Input, HostListener, Directive,
  HostBinding, ElementRef, Renderer2, NgZone, OnInit
} from '@angular/core';
import {RowDragService} from "../services/row-drag.service";

export interface DropTargetOptions {
  zone?: string;
}

@Directive({
  selector: '[row-droppable]'
})
export class RowDropDirective implements OnInit {

  /**
   * Added to the element any time a draggable element is being dragged
   */
  @Input() dragActiveClass: string;

  /**
   * Added to the element when an element is dragged over it
   */
  @Input() dragOverClass: string;

  @Output() onDropEvent = new EventEmitter();
  private options: DropTargetOptions = {};

  constructor(
    private element: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private dragService: RowDragService) {

  }

  public ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
        this.element.nativeElement.addEventListener(
            'drop', this.onDrop.bind(this)
        );
        this.element.nativeElement.addEventListener(
            'dragend', this.onDragLeave.bind(this)
        );
        this.element.nativeElement.addEventListener(
            'dragover', this.onDragOver.bind(this)
        );
        this.element.nativeElement.addEventListener(
            'dragenter', this.onDragEnter.bind(this)
        );
        this.element.nativeElement.addEventListener(
            'dragleave', this.onDragLeave.bind(this)
        );
    });
  }

  public addDragOverClass() {
    this.renderer.addClass(
      this.element.nativeElement,
      this.dragOverClass
    );
  }

  public removeDragOverClass() {
    this.renderer.removeClass(
      this.element.nativeElement,
      this.dragOverClass
    );
  }

  private onDragEnter(event) {
    this.dragService.setActiveDropElement(this);
    event.preventDefault();
  }

  private onDragOver(event) {
    event.preventDefault();
  }

  private onDragLeave() {
    this.removeDragOverClass();
  }

  private onDrop(event: DragEvent) {
    const data = parseInt(event.dataTransfer.getData('data'), 10);
    const item = this.dragService.getItem();
    this.removeDragOverClass();
    this.dragService.endDrag();
    this.onDropEvent.emit( { index: data, item });
  }
}
