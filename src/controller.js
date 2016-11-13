// @flow
import * as Ship from 'redux-ship';
import * as Effect from './effect';
import * as Model from './model';

export type Action = {
  type: 'GetEye',
} | {
  type: 'GetMovies',
};

type Control<A> = Ship.Ship<*, Model.Commit, Model.State, A>;

function* getEye(): Control<void> {
  const currentEye = yield* Ship.getState(state => state.eye);
  if (!currentEye) {
    yield* Ship.commit({
      type: 'GetEyeStart',
    });
    const r2d2 = yield* Effect.httpRequest('https://swapi.co/api/people/3/');
    yield* Ship.commit({
      type: 'GetEyeSuccess',
      eye: r2d2.eye_color,
    });
  }
}

function* getMovies(): Control<void> {
  const currentMovies = yield* Ship.getState(state => state.movies);
  if (!currentMovies) {
    yield* Ship.commit({
      type: 'GetMoviesStart',
    });
    const r2d2 = yield* Effect.httpRequest('http://swapi.co/api/people/3/');
    const movieUrls: string[] = r2d2.films;
    const movieTitles = yield* Ship.all(movieUrls.map(function* (movieUrl) {
      const movie = yield* Effect.httpRequest(movieUrl);
      return movie.title;
    }));
    yield* Ship.commit({
      type: 'GetMoviesSuccess',
      movies: movieTitles,
    });
  }
}

export function* control(action: Action): Control<void> {
  switch (action.type) {
    case 'GetEye':
      yield* getEye();
      return;
    case 'GetMovies':
      yield* getMovies();
      return;
    default:
      return;
  }
}
