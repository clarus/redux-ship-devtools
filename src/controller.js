// @flow
import * as Ship from 'redux-ship';
import * as Model from './model';

export type Action = empty;

export function* control(action: Action): Ship.Ship<*, Model.Commit, Model.State, void> {
  switch (action.type) {
  default:
    return;
  }
}
