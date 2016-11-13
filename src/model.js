// @flow

export type State = {
  areMoviesLoading: bool,
  eye: ?string,
  isEyeLoading: bool,
  movies: ?(string[]),
};

export const initialState: State = {
  areMoviesLoading: false,
  eye: null,
  isEyeLoading: false,
  movies: null,
};

export type Commit = {
  type: 'GetEyeStart',
} | {
  type: 'GetEyeSuccess',
  eye: string,
} | {
  type: 'GetMoviesStart',
} | {
  type: 'GetMoviesSuccess',
  movies: string[],
};

export function reduce(state: State, commit: Commit): State {
  switch (commit.type) {
    case 'GetEyeStart':
      return {
        ...state,
        isEyeLoading: true,
      };
    case 'GetEyeSuccess':
      return {
        ...state,
        eye: commit.eye,
        isEyeLoading: false,
      };
    case 'GetMoviesStart':
      return {
        ...state,
        areMoviesLoading: true,
      };
    case 'GetMoviesSuccess':
      return {
        ...state,
        areMoviesLoading: false,
        movies: commit.movies,
      };
    default:
      return state;
  }
}
