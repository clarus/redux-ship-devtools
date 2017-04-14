// @flow
import React, { PureComponent } from 'react';
import * as Controller from './controller';

type Props = {
  active: bool,
  dispatch: (action: Controller.Action) => void,
  index: number,
  title: ?string,
};

export default class LogsLog extends PureComponent<void, Props, void> {
  handleClickLog = (): void => {
    this.props.dispatch({
      type: 'SelectLog',
      logIndex: this.props.index,
    });
  };

  render() {
    const className = 'button is-fullwidth' + (this.props.active ? ' is-active' : '');
    return (
      <a className={className} onClick={this.handleClickLog}>
        {this.props.title || 'unknown'}
      </a>
    );
  }
}
