// @flow
import * as Ship from 'redux-ship';
import * as Model from './model';

export type Action = {
  type: 'AddLog',
  action: mixed,
  snapshot: Ship.Snapshot<mixed, mixed>,
} | {
  type: 'SelectLog',
  logIndex: number,
} | {
  type: 'SelectSnapshotItem',
  snapshotItem: Ship.SnapshotItem<mixed, mixed>,
};

type Control<A> = Ship.Ship<*, Model.Commit, Model.State, A>;

export function* control(action: Action): Control<void> {
  switch (action.type) {
    case 'AddLog':
      yield* Ship.commit(action);
      return;
    case 'SelectLog':
      yield* Ship.commit(action);
      return;
    case 'SelectSnapshotItem':
      yield* Ship.commit(action);
      return;
    default:
      return;
  }
}
