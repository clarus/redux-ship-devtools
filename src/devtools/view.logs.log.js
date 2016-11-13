// @flow
import React, { PureComponent } from 'react';
import * as Controller from './controller';

type Props = {
  dispatch: (action: Controller.Action) => void,
  index: number,
  title: string,
};

export default class LogsLog extends PureComponent<void, Props, void> {
  handleClickLog = (): void => {
    this.props.dispatch({
      type: 'SelectLog',
      logIndex: this.props.index,
    });
  };

  render() {
    return (
      <code onClick={this.handleClickLog} style={{cursor: 'pointer'}}>
        {this.props.title}
      </code>
    );
  }
}
