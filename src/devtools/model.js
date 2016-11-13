// @flow
import * as Ship from 'redux-ship';

export type State = {
  logs: {action: mixed, snapshot: Ship.Snapshot<mixed, mixed>}[],
  selectedLog: ?number,
};

export const initialState: State = {
  logs: [],
  selectedLog: null,
};

export type Commit = {
  type: 'AddLog',
  action: mixed,
  snapshot: Ship.Snapshot<mixed, mixed>,
} | {
  type: 'SelectLog',
  logIndex: number,
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
    default:
      return state;
  }
}
