// @flow
/*global chrome*/
import 'babel-polyfill';
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

// $FlowFixMe
const eventPageConnection = chrome.runtime.connect({
  name: 'ReduxShipDevtools',
});

eventPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId,
});

eventPageConnection.onMessage.addListener(message => {
  dispatch({
    type: 'AddLog',
    action: message.action,
    snapshot: message.snapshot,
  });
});

render();
