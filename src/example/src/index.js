// @flow
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import * as Ship from 'redux-ship';
import {inspectControl, mountDevTools} from 'redux-ship-devtools';
import {logControl} from 'redux-ship-logger';
import Index from './view';
import store from './store';
import * as Controller from './controller';
import * as Effect from './effect';

const insp = mountDevTools('dev-tools');

function dispatch(action: Controller.Action): void {
  Ship.run(Effect.run, store, insp(inspectControl(logControl(Controller.control)))(action));
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
