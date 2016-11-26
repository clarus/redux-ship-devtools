// @flow
import * as Ship from 'redux-ship';
import * as Model from './model';

export type Action = Model.Commit;

type Control<A> = Ship.Ship<*, Model.Commit, Model.State, A>;

export function* control(action: Action): Control<void> {
  yield* Ship.commit(action);
}
