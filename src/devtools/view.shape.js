// @flow
import React, { PureComponent } from 'react';
import type {Snapshot, SnapshotItem} from 'redux-ship';

type Props = {
  snapshot: ?Snapshot<mixed, mixed>,
};

const style = {
  padding: 2,
};

export default class Shape extends PureComponent<void, Props, void> {
  renderEffect() {
    return (
      <div className="tile is-parent" style={style}>
        <div className="tile is-child notification is-warning has-text-centered" style={style}>
          Effect
        </div>
      </div>
    );
  }

  renderCommit() {
    return (
      <div className="tile is-parent" style={style}>
        <div className="tile is-child notification is-danger has-text-centered" style={style}>
          Commit
        </div>
      </div>
    );
  }

  renderGetState() {
    return (
      <div className="tile is-parent" style={style}>
        <div className="tile is-child notification is-success has-text-centered" style={style}>
          GetState
        </div>
      </div>
    );
  }

  renderAll(snapshots: Snapshot<mixed, mixed>[]) {
    return (
      <div className="tile">
        {snapshots.map((snapshot, index) =>
          this.renderSnapshot(snapshot)
        )}
      </div>
    );
  }

  renderSnapshotItem(snapshotItem: SnapshotItem<mixed, mixed>) {
    switch (snapshotItem.type) {
      case 'Effect':
        return this.renderEffect();
      case 'Commit':
        return this.renderCommit();
      case 'GetState':
        return this.renderGetState();
      case 'All':
        return this.renderAll(snapshotItem.snapshots);
      default:
        return null;
    }
  }

  renderSnapshot(snapshot: Snapshot<mixed, mixed>) {
    return (
      <div className="tile is-vertical">
        {snapshot.map((snapshotItem, index) =>
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
