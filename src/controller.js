// @flow
import * as Ship from 'redux-ship';
import * as Effect from './effect';
import * as Model from './model';

export type Action = {
  type: 'GetEye',
};

type Control<A> = Ship.Ship<*, Model.Commit, Model.State, A>;

function* getEye(): Control<void> {
  const r2d2 = yield* Effect.httpRequest('https://swapi.co/api/people/3/');
  yield* Ship.commit({
    type: 'GetEyeSuccess',
    eye: r2d2.eye_color,
  });
}

export function* control(action: Action): Control<void> {
  switch (action.type) {
    case 'GetEye':
      yield* getEye();
      return;
    default:
      return;
  }
}
