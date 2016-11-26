// @flow
import React, { PureComponent } from 'react';
import type {SnapshotItem} from 'redux-ship';
import * as Util from './util';

type Props = {
  snapshotItem: SnapshotItem<mixed, mixed>,
};

export default class Command extends PureComponent<void, Props, void> {
  renderJSON(json: mixed) {
    return (
      <pre>
        <code>
          {JSON.stringify(json, null, 2)}
        </code>
      </pre>
    );
  }

  renderContent(snapshotItem: SnapshotItem<mixed, mixed>) {
    switch (snapshotItem.type) {
      case 'Effect':
        return (
          <dl>
            <dt><strong>Effect</strong></dt>
            <dd>{this.renderJSON(snapshotItem.effect)}</dd>
            <dt><strong>Result</strong></dt>
            <dd>{this.renderJSON(snapshotItem.result)}</dd>
          </dl>
        );
      case 'Commit':
        return this.renderJSON(snapshotItem.commit);
      case 'GetState':
        return this.renderJSON(snapshotItem.state);
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
