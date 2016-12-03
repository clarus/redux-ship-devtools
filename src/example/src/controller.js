// @flow
import * as Ship from 'redux-ship';
import * as Effect from './effect';
import * as Model from './model';

export type Action = {
  type: 'GetEye',
} | {
  type: 'GetMovies',
} | {
  type: 'GetPeople',
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
    const r2d2 = yield* Effect.httpRequest('https://swapi.co/api/people/3/');
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

function* getPeopleNames(peopleUrls: string[]): Control<string[]> {
  return yield* Ship.all(peopleUrls.map(function* (peopleUrl) {
    const people = yield* Effect.httpRequest(peopleUrl);
    return people.name;
  }));
}

function* getSpeciesPeople(speciesUrl: string): Control<void> {
  const species = yield* Effect.httpRequest(speciesUrl);
  const names = yield* getPeopleNames(species.people);
  yield* Ship.commit({
    type: 'GetPeopleSpecies',
    species: names,
  });
}

function* getHomeWorldPeople(homeWorldUrl: string): Control<void> {
  const homeWorld = yield* Effect.httpRequest(homeWorldUrl);
  const names = yield* getPeopleNames(homeWorld.residents);
  yield* Ship.commit({
    type: 'GetPeopleHomeWorld',
    homeWorld: names,
  });
}

function* getPeople(): Control<void> {
  const currentPeople = yield* Ship.getState(state => state.people);
  if (!currentPeople) {
    yield* Ship.commit({
      type: 'GetPeopleStart',
    });
    const r2d2 = yield* Effect.httpRequest('https://swapi.co/api/people/3/');
    const homeWorldUrl: string = r2d2.homeworld;
    const speciesUrl: string = r2d2.species[0];
    yield* Ship.all([
      getSpeciesPeople(speciesUrl),
      getHomeWorldPeople(homeWorldUrl),
    ]);
    yield* Ship.commit({
      type: 'GetPeopleSuccess',
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
    case 'GetPeople':
      yield* getPeople();
      return;
    default:
      return;
  }
}
