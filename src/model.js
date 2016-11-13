// @flow

export type State = {
  eye: ?string,
};

export const initialState: State = {
  eye: null,
};

export type Commit = {
  type: 'GetEyeSuccess',
  eye: string,
};

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
    case 'GetEyeSuccess':
      return {
        ...state,
        eye: commit.eye,
      };
    default:
      return state;
  }
}
