// @flow
import React, { PureComponent } from 'react';
import * as Ship from 'redux-ship';
import * as Controller from './controller';

type Props = {
  className: string,
  dispatch: (action: Controller.Action) => void,
  snapshotItem: ?Ship.SnapshotItem<mixed, mixed>,
  title: string,
};

export default class SnapshotItem extends PureComponent<void, Props, void> {
  handleClickSnapshotItem = (): void => {
    if (this.props.snapshotItem) {
      this.props.dispatch({
        type: 'SelectSnapshotItem',
        snapshotItem: this.props.snapshotItem,
      });
    }
  };

  render() {
    const className = `tile is-child notification has-text-centered ${this.props.className}`;
    const styleParent = {
      padding: 2,
    };
    const styleChild = {
      ...this.props.snapshotItem ? {cursor: 'pointer'} : {},
      padding: 2,
    };
    return (
      <div className="tile is-parent" style={styleParent}>
        <div className={className} onClick={this.handleClickSnapshotItem} style={styleChild}>
          {this.props.title}
        </div>
      </div>
    );
  }
}
