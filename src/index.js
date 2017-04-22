// @flow
import * as Ship from 'redux-ship';

export function inspect<Action, Effect, Commit, State, A>(
  control: (action: Action) => Ship.Ship<Effect, Commit, State, A>
): (action: Action) => Ship.Ship<Effect, Commit, State, A> {
  return function* (action) {
    const {result, snapshot} = yield* Ship.snap(control(action));
    window.postMessage({
      type: 'ReduxShipDevtools',
      payload: {
        action,
        snapshot,
      },
      version: 1,
    }, '*');
    return result;
  };
}
