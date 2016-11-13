// @flow
import type {SnapshotItem} from 'redux-ship';

export function snapshotItemClassName(snapshotItem: SnapshotItem<mixed, mixed>): string {
  switch (snapshotItem.type) {
    case 'Effect':
      return 'is-warning';
    case 'Commit':
      return 'is-danger';
    case 'GetState':
      return 'is-success';
    default:
      return '';
  }
}
