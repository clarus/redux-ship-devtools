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

function getDefaultSnapshotItemIndex(snapshot: Snapshot<mixed, mixed>): ?(number[]) {
  if (snapshot.length !== 0) {
    const defaultSnapshotItem = snapshot[0];
    if (defaultSnapshotItem.type === 'All') {
      const index = getDefaultSnapshotItemIndex(defaultSnapshotItem.snapshots[0]);
      return index ? [0, 0, ...index] : null;
    }
    return [0];
  }
  return null;
}

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
    case 'AddLog': {
      const selectedLog = typeof state.selectedLog !== 'number' ?
        state.logs.length :
        state.selectedLog;
      const logs = [
        ...state.logs,
        {
          action: commit.action,
          serialized: false,
          snapshot: commit.snapshot,
        }
      ];
      return {
        ...state,
        logs,
        selectedLog,
        selectedSnapshotItems: state.selectedSnapshotItems[selectedLog] ?
          state.selectedSnapshotItems : {
            ...state.selectedSnapshotItems,
            [selectedLog]: getDefaultSnapshotItemIndex(logs[selectedLog].snapshot),
          },
      };
    }
    case 'Clear':
      return initialState;
    case 'SelectLog':
      return commit.logIndex === state.selectedLog ? state : {
        ...state,
        selectedLog: commit.logIndex,
        selectedSnapshotItems: state.selectedSnapshotItems[commit.logIndex] ?
          state.selectedSnapshotItems : {
            ...state.selectedSnapshotItems,
            [commit.logIndex]: getDefaultSnapshotItemIndex(state.logs[commit.logIndex].snapshot),
          },
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
