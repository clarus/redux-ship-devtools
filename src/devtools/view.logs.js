// @flow
import React, { PureComponent } from 'react';
import * as Controller from './controller';
import * as Model from './model';
import LogsLog from './view.logs.log';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
};

export default class Logs extends PureComponent<void, Props, void> {
  actionTitle(action: mixed): string {
    return typeof action === 'object' && action !== null && typeof action.type === 'string' ?
      action.type :
      'unknown';
  }

  render() {
    return (
      <div>
        <p className="title is-5">Logs</p>
        <ul>
          {this.props.state.logs.map((log, index) =>
            <li key={index}>
              <LogsLog
                dispatch={this.props.dispatch}
                index={index}
                title={this.actionTitle(log.action)}
              />
            </li>
          )}
        </ul>
      </div>
    );
  }
}
