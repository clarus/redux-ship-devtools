// @flow
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Ship from 'redux-ship';
import {inspectControl} from 'redux-ship-devtools';
import Index from './view';
import store from './store';
import * as Controller from './controller';
import * as Effect from './effect';

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
