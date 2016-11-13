// @flow
import React, { PureComponent } from 'react';
import * as Model from './model';

type Props = {
  state: Model.State,
};

export default class Action extends PureComponent<void, Props, void> {
  render() {
    const selectedAction: ?mixed =
      typeof this.props.state.selectedLog === 'number' &&
        this.props.state.logs[this.props.state.selectedLog] ?
        this.props.state.logs[this.props.state.selectedLog].action :
        null;
    return (
      <div>
        <p className="title is-3">Action</p>
        {selectedAction &&
          <pre>
            <code>{JSON.stringify(selectedAction, null, 2)}</code>
          </pre>
        }
      </div>
    );
  }
}
