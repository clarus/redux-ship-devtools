// @flow
import * as Ship from 'redux-ship';

type Control<Action, Effect, Commit, State> =
  (action: Action) => Ship.Ship<Effect, Commit, State, void>;

export function inspect<Action, Effect, Commit, State>(
  control: Control<Action, Effect, Commit, State>
): Control<Action, Effect, Commit, State> {
  return function* (action) {
    const {snapshot} = yield* Ship.snap(control(action));
    window.postMessage({
      type: 'ReduxShipDevtools',
      payload: {
        action,
        snapshot,
      },
      version: 1,
    }, '*');
  };
}
