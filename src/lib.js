// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import * as Ship from 'redux-ship';
import * as Controller from './controller';
import Index from './view';
import store from './store';

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

export function mount<Action, Effect, Commit, State>(
  domId: string
): (control: Control<Action, Effect, Commit, State>) => Control<Action, Effect, Commit, State> {
  function dispatch(action: Controller.Action): void {
    Ship.run(() => {}, store, Controller.control(action));
  }

  function render() {
    ReactDOM.render(
      React.createElement(Index, {dispatch, state: store.getState()}),
      document.getElementById(domId)
    );
  }

  store.subscribe(render);
  render();

  return control => function* (action) {
    const {snapshot} = yield* Ship.snap(control(action));
    dispatch({
      type: 'AddLog',
      action,
      snapshot,
    });
  };
}
