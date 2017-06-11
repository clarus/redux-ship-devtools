// @flow
import type {Snapshot, SnapshotItem} from 'redux-ship';

type Log = {
  action: mixed,
  serialized: bool,
  snapshot: Snapshot<mixed, mixed>,
};

export type State = {
  logs: Log[],
  selectedLog: ?number,
  selectedSnapshotItems: {[logIndex: number]: number[]},
};

export const initialState: State = {
  logs: [],
  selectedLog: null,
  selectedSnapshotItems: {},
};

export type Commit = {
  type: 'AddLog',
  action: mixed,
  snapshot: Snapshot<any, any>,
} | {
  type: 'Clear',
} | {
  type: 'SelectLog',
  logIndex: number,
} | {
  type: 'SelectSnapshotItem',
  snapshotItemIndex: number[],
} | {
  type: 'ShowSerializedSnapshot',
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
            serialized: false,
            snapshot: commit.snapshot,
          }
        ],
        selectedLog: typeof state.selectedLog !== 'number' ?
          state.logs.length :
          state.selectedLog,
      };
    case 'Clear':
      return initialState;
    case 'SelectLog':
      return commit.logIndex === state.selectedLog ? state : {
        ...state,
        selectedLog: commit.logIndex,
      };
    case 'SelectSnapshotItem':
      return typeof state.selectedLog !== 'number' ? state : {
          ...state,
          selectedSnapshotItems: {
            ...state.selectedSnapshotItems,
            [state.selectedLog]: commit.snapshotItemIndex,
          },
        };
    case 'ShowSerializedSnapshot':
      return {
        ...state,
        logs: state.logs.map((log, index) =>
          index === state.selectedLog ? {...log, serialized: true} : log
        ),
      };
    default:
      return state;
  }
}

export function getSelectedLog(state: State): ?Log {
  return typeof state.selectedLog === 'number' ?
    state.logs[state.selectedLog] :
    null;
}

export function getSelectedSnapshotItemIndex(state: State): ?(number[]) {
  return typeof state.selectedLog === 'number' ?
    state.selectedSnapshotItems[state.selectedLog] :
    null;
}

function extractSnapshotItem(
  snapshot: Snapshot<mixed, mixed>,
  index: number[]
): ?SnapshotItem<mixed, mixed> {
  if (index.length === 0) {
    return null;
  }
  const [firstIndex, secondIndex, ...otherIndexes] = index;
  const item = snapshot[firstIndex];
  if (item) {
    if (item.type === 'All' && typeof secondIndex === 'number') {
      return extractSnapshotItem(item.snapshots[secondIndex], otherIndexes);
    }
    return item;
  }
  return null;
}

export function getSelectedSnapshotItem(state: State): ?SnapshotItem<mixed, mixed> {
  const selectedLog = getSelectedLog(state);
  const selectedSnapshotItemIndex = getSelectedSnapshotItemIndex(state);
  return selectedLog && selectedSnapshotItemIndex &&
    extractSnapshotItem(selectedLog.snapshot, selectedSnapshotItemIndex);
}
