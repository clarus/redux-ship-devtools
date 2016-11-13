// @flow

export type State = {
};

export const initialState: State = {
};

export type Commit = empty;

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
  default:
    return state;
  }
}
