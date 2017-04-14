// @flow
import React, { PureComponent } from 'react';
import * as Ship from 'redux-ship';
import * as Controller from './controller';
import Code from './view.code';
import SnapshotItem from './view.snapshot.item';
import * as Util from './util';

type Props = {
  dispatch: (action: Controller.Action) => void,
  snapshot: ?Ship.Snapshot<mixed, mixed>,
};

export default class Snapshot extends PureComponent<void, Props, void> {
  renderNothing() {
    return (
      <SnapshotItem
        className="is-info"
        dispatch={this.props.dispatch}
        snapshotItem={null}
        title="Nothing"
      />
    );
  }

  renderAll(snapshots: Ship.Snapshot<mixed, mixed>[]) {
    return (
      <div className="tile">
        {snapshots.length !== 0 ?
          snapshots.map(snapshot => this.renderSnapshot(snapshot)) :
          this.renderNothing()
        }
      </div>
    );
  }

  snapshotItemTitle(snapshotItem: Ship.SnapshotItem<mixed, mixed>): string {
    if (snapshotItem.type === 'Effect' && typeof snapshotItem.effect === 'object' &&
      snapshotItem.effect !== null && typeof snapshotItem.effect.type === 'string'
    ) {
      return snapshotItem.effect.type;
    }
    return snapshotItem.type;
  }

  renderSnapshotItem(snapshotItem: Ship.SnapshotItem<mixed, mixed>) {
    switch (snapshotItem.type) {
      case 'All':
        return this.renderAll(snapshotItem.snapshots);
      default: {
        const title = this.snapshotItemTitle(snapshotItem);
        return (
          <SnapshotItem
            className={Util.snapshotItemClassName(snapshotItem)}
            dispatch={this.props.dispatch}
            snapshotItem={snapshotItem}
            title={title}
          />
        );
      }
    }
  }

  renderSnapshot(snapshot: Ship.Snapshot<mixed, mixed>) {
    return (
      <div className="tile is-vertical">
        {snapshot.length !== 0 ?
          snapshot.map(snapshotItem => this.renderSnapshotItem(snapshotItem)) :
          this.renderNothing()
        }
      </div>
    );
  }

  render() {
    return (
      <div>
        <p className="title is-5">Snapshot</p>
        {this.props.snapshot &&
          <div style={{marginBottom: 20}}>
            <Code isExpanded={false} json={this.props.snapshot} />
          </div>
        }
        <div className="tile is-ancestor">
          {this.props.snapshot && this.renderSnapshot(this.props.snapshot)}
        </div>
      </div>
    );
  }
}
