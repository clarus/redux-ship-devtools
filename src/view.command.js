// @flow
import React, { PureComponent } from 'react';
import type {SnapshotItem} from 'redux-ship';
import Code from './view.code';
import * as Util from './util';

type Props = {
  snapshotItem: SnapshotItem<mixed, mixed>,
};

export default class Command extends PureComponent<void, Props, void> {
  renderContent(snapshotItem: SnapshotItem<mixed, mixed>) {
    switch (snapshotItem.type) {
      case 'Effect':
        return (
          <dl>
            <dt><strong>Effect</strong></dt>
            <dd><Code isExpanded json={snapshotItem.effect} /></dd>
            <dt><strong>Result</strong></dt>
            <dd><Code isExpanded json={snapshotItem.result} /></dd>
          </dl>
        );
      case 'Commit':
        return <Code isExpanded json={snapshotItem.commit} />;
      case 'GetState':
        return <Code isExpanded json={snapshotItem.state} />;
      default:
        return null;
    }
  }

  render() {
    const className = `title is-5 tag ${Util.snapshotItemClassName(this.props.snapshotItem)}`;
    return (
      <div>
        <p className={className}>{this.props.snapshotItem.type}</p>
        {this.renderContent(this.props.snapshotItem)}
      </div>
    );
  }
}
