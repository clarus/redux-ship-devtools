// @flow
import type {Ship} from 'redux-ship';
import {snap} from 'redux-ship';

export function inspectControl<Action, Effect, Commit, State>(
  control: (action: Action) => Ship<Effect, Commit, State, void>
): (action: Action) => Ship<Effect, Commit, State, void> {
  return function* (action) {
    const {snapshot} = yield* snap(control(action));
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
