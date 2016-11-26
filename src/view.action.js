// @flow
import React, { PureComponent } from 'react';
import Code from './view.code';

type Props = {
  action: ?mixed,
};

export default class Action extends PureComponent<void, Props, void> {
  render() {
    return (
      <div>
        <p className="title is-5">Action</p>
        {this.props.action && <Code json={this.props.action} />}
      </div>
    );
  }
}
