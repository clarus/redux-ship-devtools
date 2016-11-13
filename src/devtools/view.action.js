// @flow
import React, { PureComponent } from 'react';

type Props = {
  action: ?mixed,
};

export default class Action extends PureComponent<void, Props, void> {
  render() {
    return (
      <div>
        <p className="title is-3">Action</p>
        {this.props.action &&
          <pre>
            <code>{JSON.stringify(this.props.action, null, 2)}</code>
          </pre>
        }
      </div>
    );
  }
}
