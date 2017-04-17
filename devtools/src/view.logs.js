// @flow
import React, { PureComponent } from 'react';
import * as Controller from './controller';
import * as Model from './model';
import LogsLog from './view.logs.log';
import * as Util from './util';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
};

export default class Logs extends PureComponent<void, Props, void> {
  handleClear = (): void => {
    this.props.dispatch({
      type: 'Clear',
    });
  };

  render() {
    return (
      <div>
        <p className="title is-5">Logs</p>
        {this.props.state.logs.map((log, index) =>
          <p key={index} style={{margin: 2}}>
            <LogsLog
              active={index === this.props.state.selectedLog}
              dispatch={this.props.dispatch}
              index={index}
              title={Util.actionTitle(log.action)}
            />
          </p>
        )}
        <p style={{marginTop: 20}}>
          <a
            className="button is-danger is-fullwidth"
            onClick={this.handleClear}
          >
            Clear
          </a>
        </p>
      </div>
    );
  }
}
