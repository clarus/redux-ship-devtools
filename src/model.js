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
  type: 'Clear',
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
        selectedLog: typeof state.selectedLog !== 'number' ?
          state.logs.length :
          state.selectedLog,
        selectedSnapshotItem: typeof state.selectedLog !== 'number' ?
          commit.snapshot[0] || null :
          state.selectedSnapshotItem,
      };
    case 'Clear':
      return initialState;
    case 'SelectLog':
      return commit.logIndex === state.selectedLog ? state : {
        ...state,
        selectedLog: commit.logIndex,
        selectedSnapshotItem: state.logs[commit.logIndex].snapshot[0] || null,
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
