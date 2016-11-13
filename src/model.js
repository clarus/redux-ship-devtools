// @flow

export type State = {
  eye: ?string,
  movies: ?(string[]),
};

export const initialState: State = {
  eye: null,
  movies: null,
};

export type Commit = {
  type: 'GetEyeSuccess',
  eye: string,
} | {
  type: 'GetMoviesSuccess',
  movies: string[],
};

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
    case 'GetEyeSuccess':
      return {
        ...state,
        eye: commit.eye,
      };
    case 'GetMoviesSuccess':
      return {
        ...state,
        movies: commit.movies,
      };
    default:
      return state;
  }
}
