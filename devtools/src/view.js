// @flow
import React, { PureComponent } from 'react';
import * as Controller from './controller';
import * as Model from './model';
import Action from './view.action';
import Command from './view.command';
import Logs from './view.logs';
import Snapshot from './view.snapshot';
import * as Ship from 'redux-ship';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
};

export default class Index extends PureComponent<void, Props, void> {
  render() {
    const {state} = this.props;
    const selectedLog = Model.getSelectedLog(state);
    const selectedSnapshotItem = Model.getSelectedSnapshotItem(state);
    const selectedSnapshotItemIndex = Model.getSelectedSnapshotItemIndex(state);
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
                      state={state}
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
                        serialized={!!selectedLog && selectedLog.serialized}
                        snapshot={selectedLog && selectedLog.snapshot}
                        selectedSnapshotItemIndex={selectedSnapshotItemIndex}
                      />
                    </div>
                  </div>
                  {selectedSnapshotItem &&
                    <div className="tile is-parent" style={style.tileParent}>
                      <div className="tile is-child box" style={style.tileChild}>
                        <Command
                          snapshotItem={selectedSnapshotItem}
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
