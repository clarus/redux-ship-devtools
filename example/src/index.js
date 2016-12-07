// @flow
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Ship from 'redux-ship';
import * as ShipDevTools from 'redux-ship-devtools';
import {logControl} from 'redux-ship-logger';
import * as DevTools from 'devtools';
import Index from './view';
import store from './store';
import * as Controller from './controller';
import * as Effect from './effect';

const mountedInspect = DevTools.mount('dev-tools');

function dispatch(action: Controller.Action): void {
  const control = mountedInspect(ShipDevTools.inspect(logControl(Controller.control)));
  Ship.run(Effect.run, store, control(action));
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
