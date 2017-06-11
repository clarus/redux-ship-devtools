// @flow
import React, { PureComponent } from 'react';
import * as Ship from 'redux-ship';
import * as Controller from './controller';

type Props = {
  active: bool,
  className: string,
  dispatch: (action: Controller.Action) => void,
  snapshotItemIndex: ?(number[]),
  title: string,
};

export default class SnapshotItem extends PureComponent<void, Props, void> {
  handleClickSnapshotItem = (): void => {
    if (this.props.snapshotItemIndex) {
      this.props.dispatch({
        type: 'SelectSnapshotItem',
        snapshotItemIndex: this.props.snapshotItemIndex,
      });
    }
  };

  render() {
    const className = `tile is-child notification button ${this.props.className}` +
      (this.props.active ? ' is-active' : '');
    const styleParent = {
      padding: 2,
    };
    const styleChild = {
      height: 'auto',
      padding: 2,
    };
    return (
      <div className="tile is-parent" style={styleParent}>
        <div
          className={className}
          disabled={!this.props.snapshotItemIndex}
          onClick={this.handleClickSnapshotItem}
          style={styleChild}
        >
          {this.props.title}
        </div>
      </div>
    );
  }
}
