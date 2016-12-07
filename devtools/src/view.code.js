// @flow
import React, { PureComponent } from 'react';

type Props = {
  isExpanded: bool,
  json: mixed,
};

export default class Code extends PureComponent<void, Props, void> {
  render() {
    return (
      <pre>
        <code>
          {JSON.stringify(this.props.json, null, this.props.isExpanded ? 2 : 0)}
        </code>
      </pre>
    );
  }
}
