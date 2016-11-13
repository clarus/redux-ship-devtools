// @flow
import React, { PureComponent } from 'react';

type Props = {
};

export default class Devtools extends PureComponent<void, Props, void> {
  render() {
    return (
      <div>
        <p className="title is-1">Devtools</p>
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box">
              <p className="title is-3">Logs</p>
            </div>
          </div>
          <div className="tile is-vertical">
            <div className="tile is-parent">
              <div className="tile is-child box">
                <p className="title is-3">Action</p>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child box">
                <p className="title is-3">Shape</p>
              </div>
            </div>
          </div>
          <div className="tile is-parent">
            <div className="tile is-child box">
              <p className="title is-3">Command</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
