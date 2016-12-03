// @flow

export type State = {
  areMoviesLoading: bool,
  arePeopleLoading: bool,
  eye: ?string,
  isEyeLoading: bool,
  movies: ?(string[]),
  people: ?{
    homeWorld: ?(string[]),
    species: ?(string[]),
  },
};

export const initialState: State = {
  areMoviesLoading: false,
  arePeopleLoading: false,
  eye: null,
  isEyeLoading: false,
  movies: null,
  people: null,
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
} | {
  type: 'GetPeopleHomeWorld',
  homeWorld: string[],
} | {
  type: 'GetPeopleSpecies',
  species: string[],
} | {
  type: 'GetPeopleStart',
} | {
  type: 'GetPeopleSuccess',
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
    case 'GetPeopleHomeWorld':
      return {
        ...state,
        people: {
          ...state.people,
          homeWorld: commit.homeWorld,
        },
      };
    case 'GetPeopleSpecies':
      return {
        ...state,
        people: {
          ...state.people,
          species: commit.species,
        },
      };
    case 'GetPeopleStart':
      return {
        ...state,
        arePeopleLoading: true,
        people: {
          homeWorld: null,
          species: null,
        },
      };
    case 'GetPeopleSuccess':
      return {
        ...state,
        arePeopleLoading: false,
      };
    default:
      return state;
  }
}
