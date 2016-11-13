// @flow
import React, { PureComponent } from 'react';
import type {Snapshot, SnapshotItem} from 'redux-ship';

type Props = {
  snapshot: ?Snapshot<mixed, mixed>,
};

export default class Shape extends PureComponent<void, Props, void> {
  renderEffect() {
    return (
      <div className="tile is-parent">
        <div className="tile is-child notification is-warning">
          Effect
        </div>
      </div>
    );
  }

  renderCommit() {
    return (
      <div className="tile is-parent">
        <div className="tile is-child notification is-danger">
          Commit
        </div>
      </div>
    );
  }

  renderGetState() {
    return (
      <div className="tile is-parent">
        <div className="tile is-child notification is-success">
          GetState
        </div>
      </div>
    );
  }

  renderAll(snapshots: Snapshot<mixed, mixed>[]) {
    return (
      <div className="tile">
        {snapshots.map((snapshot, index) =>
          <div key={index}>
            {this.renderSnapshot(snapshot)}
          </div>
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
          <div key={index}>
            {this.renderSnapshotItem(snapshotItem)}
          </div>
        )}
      </div>
    );
  }

  render() {
    return (
      <div>
        <p className="title is-3">Shape</p>
        {this.props.snapshot && this.renderSnapshot(this.props.snapshot)}
      </div>
    );
  }
}
