export default class RowDropEvent {
  startIndex: number;
  destIndex: number;
  row: any;

  constructor(startIndex: number, destIndex: number, row: any) {
    this.startIndex = startIndex;
    this.destIndex = destIndex;
    this.row = row;
  }
}
