// @flow
import * as Ship from 'redux-ship';
import * as Model from './model';

export type Action = {
  type: 'AddEvent',
  action: mixed,
  snapshot: Ship.Snapshot<mixed, mixed>,
};

type Control<A> = Ship.Ship<*, Model.Commit, Model.State, A>;

export function* control(action: Action): Control<void> {
  switch (action.type) {
    case 'AddEvent':
      yield* Ship.commit({
        type: 'AddEvent',
        action: action.action,
        snapshot: action.snapshot,
      });
      return;
    default:
      return;
  }
}
