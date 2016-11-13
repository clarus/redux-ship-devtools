// @flow
import * as Ship from 'redux-ship';

export type State = {
  logs: {action: mixed, snapshot: Ship.Snapshot<mixed, mixed>}[],
};

export const initialState: State = {
  logs: [],
};

export type Commit = {
  type: 'AddEvent',
  action: mixed,
  snapshot: Ship.Snapshot<mixed, mixed>,
};

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
    case 'AddEvent':
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
    default:
      return state;
  }
}
