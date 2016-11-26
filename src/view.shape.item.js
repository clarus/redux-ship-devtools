// @flow
import React, { PureComponent } from 'react';
import type {SnapshotItem} from 'redux-ship';
import * as Controller from './controller';

type Props = {
  className: string,
  dispatch: (action: Controller.Action) => void,
  snapshotItem: SnapshotItem<mixed, mixed>,
  title: string,
};

export default class ShapeItem extends PureComponent<void, Props, void> {
  handleClickSnapshotItem = (): void => {
    this.props.dispatch({
      type: 'SelectSnapshotItem',
      snapshotItem: this.props.snapshotItem,
    });
  };

  render() {
    const className = `tile is-child notification has-text-centered ${this.props.className}`;
    const styleParent = {
      padding: 2,
    };
    const styleChild = {
      cursor: 'pointer',
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
