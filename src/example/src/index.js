// @flow
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Ship from 'redux-ship';
import Index from './view';
import store from './store';
import * as Controller from './controller';
import * as Effect from './effect';

function inspectControl<Action, Effect, Commit, State>(
  control: (action: Action) => Ship.Ship<Effect, Commit, State, void>
): (action: Action) => Ship.Ship<Effect, Commit, State, void> {
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

function dispatch(action: Controller.Action): void {
  Ship.run(Effect.run, store, inspectControl(Controller.control)(action));
}

function render() {
  ReactDOM.render(
    <Index
      dispatch={dispatch}
      state={store.getState()}
    />,
    document.getElementById('root')
  );
}

store.subscribe(render);
render();
