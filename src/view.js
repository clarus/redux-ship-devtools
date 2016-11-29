// @flow
import React, { PureComponent } from 'react';
import * as Controller from './controller';
import * as Model from './model';
import Action from './view.action';
import Command from './view.command';
import Logs from './view.logs';
import Snapshot from './view.snapshot';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
};

export default class Index extends PureComponent<void, Props, void> {
  render() {
    const selectedLog = typeof this.props.state.selectedLog === 'number' ?
      this.props.state.logs[this.props.state.selectedLog] :
      null;
    const style = {
      notification: {
        marginBottom: 25,
        padding: 10,
      },
      tileChild: {
        overflowX: 'auto',
        padding: 15,
      },
      tileParent: {
        padding: 3,
      },
    }
    return (
      <div className="container" style={{maxWidth: 'none'}}>
        <div className="notification" style={style.notification}>
          <div className="content">
            <div className="tile is-ancestor is-vertical">
              <div className="tile">
                <div className="tile is-parent is-3" style={style.tileParent}>
                  <div className="tile is-child box" style={style.tileChild}>
                    <Logs
                      dispatch={this.props.dispatch}
                      state={this.props.state}
                    />
                  </div>
                </div>
                <div className="tile is-vertical is-9">
                  <div className="tile is-parent" style={style.tileParent}>
                    <div className="tile is-child box" style={style.tileChild}>
                      <Action
                        action={selectedLog && selectedLog.action}
                      />
                    </div>
                  </div>
                  <div className="tile is-parent" style={style.tileParent}>
                    <div className="tile is-child box" style={style.tileChild}>
                      <Snapshot
                        dispatch={this.props.dispatch}
                        snapshot={selectedLog && selectedLog.snapshot}
                      />
                    </div>
                  </div>
                  {this.props.state.selectedSnapshotItem &&
                    <div className="tile is-parent" style={style.tileParent}>
                      <div className="tile is-child box" style={style.tileChild}>
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
        </div>
      </div>
    );
  }
}
