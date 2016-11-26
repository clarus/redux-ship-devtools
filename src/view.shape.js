// @flow
import React, { PureComponent } from 'react';
import type {Snapshot, SnapshotItem} from 'redux-ship';
import * as Controller from './controller';
import ShapeItem from './view.shape.item';
import * as Util from './util';

type Props = {
  dispatch: (action: Controller.Action) => void,
  snapshot: ?Snapshot<mixed, mixed>,
};

export default class Shape extends PureComponent<void, Props, void> {
  renderAll(snapshots: Snapshot<mixed, mixed>[]) {
    return (
      <div className="tile">
        {snapshots.map(snapshot =>
          this.renderSnapshot(snapshot)
        )}
      </div>
    );
  }

  renderSnapshotItem(snapshotItem: SnapshotItem<mixed, mixed>) {
    switch (snapshotItem.type) {
      case 'All':
        return this.renderAll(snapshotItem.snapshots);
      default:
        return (
          <ShapeItem
            className={Util.snapshotItemClassName(snapshotItem)}
            dispatch={this.props.dispatch}
            snapshotItem={snapshotItem}
            title={snapshotItem.type}
          />
        );
    }
  }

  renderSnapshot(snapshot: Snapshot<mixed, mixed>) {
    return (
      <div className="tile is-vertical">
        {snapshot.map(snapshotItem =>
          this.renderSnapshotItem(snapshotItem)
        )}
      </div>
    );
  }

  render() {
    return (
      <div>
        <p className="title is-5">Shape</p>
        <div className="tile is-ancestor">
          {this.props.snapshot && this.renderSnapshot(this.props.snapshot)}
        </div>
      </div>
    );
  }
}
