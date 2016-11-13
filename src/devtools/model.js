// @flow
import type {Snapshot, SnapshotItem} from 'redux-ship';

export type State = {
  logs: {action: mixed, snapshot: Snapshot<mixed, mixed>}[],
  selectedLog: ?number,
  selectedSnapshotItem: ?SnapshotItem<mixed, mixed>,
};

export const initialState: State = {
  logs: [],
  selectedLog: null,
  selectedSnapshotItem: null,
};

export type Commit = {
  type: 'AddLog',
  action: mixed,
  snapshot: Snapshot<mixed, mixed>,
} | {
  type: 'SelectLog',
  logIndex: number,
} | {
  type: 'SelectSnapshotItem',
  snapshotItem: SnapshotItem<mixed, mixed>,
};

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
    case 'AddLog':
      return {
        ...state,
        logs: [
          ...state.logs,
          {
            action: commit.action,
            snapshot: commit.snapshot,
          }
        ],
      };
    case 'SelectLog':
      return {
        ...state,
        selectedLog: commit.logIndex,
      };
    case 'SelectSnapshotItem':
      return {
        ...state,
        selectedSnapshotItem: commit.snapshotItem,
      };
    default:
      return state;
  }
}
