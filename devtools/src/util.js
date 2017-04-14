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

export function snapshotItemTitle(snapshotItem: SnapshotItem<mixed, mixed>): string {
  if (snapshotItem.type === 'Effect' && typeof snapshotItem.effect === 'object' &&
    snapshotItem.effect !== null && typeof snapshotItem.effect.type === 'string'
  ) {
    return snapshotItem.effect.type;
  }
  return snapshotItem.type;
}
