// @flow
import React, { PureComponent } from 'react';
import * as Controller from './controller';
import * as Model from './model';
import Action from './view.action';
import Command from './view.command';
import Logs from './view.logs';
import Shape from './view.shape';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
};

export default class Index extends PureComponent<void, Props, void> {
  render() {
    const selectedLog = typeof this.props.state.selectedLog === 'number' ?
      this.props.state.logs[this.props.state.selectedLog] :
      null;
    const tileChildStyle = {overflowX: 'auto'};
    return (
      <div className="container">
        <div className="notification">
          <div className="content">
            <div className="tile is-ancestor is-vertical">
              <div className="tile">
                <div className="tile is-parent is-3">
                  <div className="tile is-child box" style={tileChildStyle}>
                    <Logs
                      dispatch={this.props.dispatch}
                      state={this.props.state}
                    />
                  </div>
                </div>
                <div className="tile is-vertical is-9">
                  <div className="tile is-parent">
                    <div className="tile is-child box" style={tileChildStyle}>
                      <Action
                        action={selectedLog && selectedLog.action}
                      />
                    </div>
                  </div>
                  <div className="tile is-parent">
                    <div className="tile is-child box" style={tileChildStyle}>
                      <Shape
                        dispatch={this.props.dispatch}
                        snapshot={selectedLog && selectedLog.snapshot}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {this.props.state.selectedSnapshotItem &&
                <div className="tile is-parent">
                  <div className="tile is-child box" style={tileChildStyle}>
                    <Command
                      snapshotItem={this.props.state.selectedSnapshotItem}
                    />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
