// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import * as Ship from 'redux-ship';
import {logControl} from 'redux-ship-logger';
import Index from './view';
import store from './store';
import * as Controller from './controller';

function dispatch(action: Controller.Action): void {
  Ship.run(() => {}, store, logControl(Controller.control)(action));
}

export function inspectControl<Action, Effect, Commit, State>(
  control: (action: Action) => Ship.Ship<Effect, Commit, State, void>
): (action: Action) => Ship.Ship<Effect, Commit, State, void> {
  return function* (action) {
    const {snapshot} = yield* Ship.snap(control(action));
    dispatch({
      type: 'AddLog',
      action,
      snapshot: (snapshot: Ship.Snapshot<any, any>),
    });
  };
}

function render() {
  ReactDOM.render(
    <Index
      dispatch={dispatch}
      state={store.getState()}
    />,
    document.getElementById('devtools')
  );
}

store.subscribe(render);
render();
