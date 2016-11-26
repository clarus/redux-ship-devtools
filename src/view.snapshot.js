// @flow
import React, { PureComponent } from 'react';
import * as Ship from 'redux-ship';
import * as Controller from './controller';
import SnapshotItem from './view.snapshot.item';
import * as Util from './util';

type Props = {
  dispatch: (action: Controller.Action) => void,
  snapshot: ?Ship.Snapshot<mixed, mixed>,
};

export default class Snapshot extends PureComponent<void, Props, void> {
  renderAll(snapshots: Ship.Snapshot<mixed, mixed>[]) {
    return (
      <div className="tile">
        {snapshots.map(snapshot =>
          this.renderSnapshot(snapshot)
        )}
      </div>
    );
  }

  renderSnapshotItem(snapshotItem: Ship.SnapshotItem<mixed, mixed>) {
    switch (snapshotItem.type) {
      case 'All':
        return this.renderAll(snapshotItem.snapshots);
      default:
        return (
          <SnapshotItem
            className={Util.snapshotItemClassName(snapshotItem)}
            dispatch={this.props.dispatch}
            snapshotItem={snapshotItem}
            title={snapshotItem.type}
          />
        );
    }
  }

  renderSnapshot(snapshot: Ship.Snapshot<mixed, mixed>) {
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
        <p className="title is-5">Snapshot</p>
        <div className="tile is-ancestor">
          {this.props.snapshot && this.renderSnapshot(this.props.snapshot)}
        </div>
      </div>
    );
  }
}
