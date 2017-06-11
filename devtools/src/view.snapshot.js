// @flow
import React, { PureComponent } from 'react';
import * as Ship from 'redux-ship';
import * as Controller from './controller';
import Code from './view.code';
import SnapshotItem from './view.snapshot.item';
import * as Util from './util';

type Props = {
  dispatch: (action: Controller.Action) => void,
  serialized: bool,
  snapshot: ?Ship.Snapshot<mixed, mixed>,
};

export default class Snapshot extends PureComponent<void, Props, void> {
  handleShowSerializedSnapshot = (): void => {
    this.props.dispatch({type: 'ShowSerializedSnapshot'});
  };

  renderNothing() {
    return (
      <SnapshotItem
        className="is-info"
        dispatch={this.props.dispatch}
        snapshotItemIndex={null}
        title="Nothing"
      />
    );
  }

  renderAll(snapshots: Ship.Snapshot<mixed, mixed>[], index: number[]) {
    return (
      <div className="tile" key={JSON.stringify(index)}>
        {snapshots.length !== 0 ?
          snapshots.map((snapshot, currentIndex) =>
            this.renderSnapshot(snapshot, [...index, currentIndex])
          ) :
          this.renderNothing()
        }
      </div>
    );
  }

  renderSnapshotItem(snapshotItem: Ship.SnapshotItem<mixed, mixed>, index: number[]) {
    switch (snapshotItem.type) {
      case 'All':
        return this.renderAll(snapshotItem.snapshots, index);
      default: {
        const title = Util.snapshotItemTitle(snapshotItem);
        return (
          <SnapshotItem
            className={Util.snapshotItemClassName(snapshotItem)}
            dispatch={this.props.dispatch}
            key={JSON.stringify(index)}
            snapshotItemIndex={index}
            title={title}
          />
        );
      }
    }
  }

  renderSnapshot(snapshot: Ship.Snapshot<mixed, mixed>, index: number[]) {
    return (
      <div className="tile is-vertical" key={JSON.stringify(index)}>
        {snapshot.length !== 0 ?
          snapshot.map((snapshotItem, currentIndex) =>
            this.renderSnapshotItem(snapshotItem, [...index, currentIndex])
          ) :
          this.renderNothing()
        }
      </div>
    );
  }

  renderSerializedSnapshot(snapshot: Ship.Snapshot<mixed, mixed>) {
    return this.props.serialized ?
      <Code isExpanded={false} json={this.props.snapshot} /> :
      <a className="button is-link" onClick={this.handleShowSerializedSnapshot}>
        Show serialized snapshot
      </a>;
  }

  render() {
    return (
      <div>
        <p className="title is-5">Snapshot</p>
        <div style={{marginBottom: 20}}>
          {this.props.snapshot && this.renderSerializedSnapshot(this.props.snapshot)}
        </div>
        <div className="tile is-ancestor">
          {this.props.snapshot && this.renderSnapshot(this.props.snapshot, [])}
        </div>
      </div>
    );
  }
}
