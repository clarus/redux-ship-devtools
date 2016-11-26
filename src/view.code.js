// @flow
import React, { PureComponent } from 'react';

type Props = {
  json: mixed,
};

export default class Code extends PureComponent<void, Props, void> {
  render() {
    return (
      <pre>
        <code>
          {JSON.stringify(this.props.json, null, 2)}
        </code>
      </pre>
    );
  }
}
