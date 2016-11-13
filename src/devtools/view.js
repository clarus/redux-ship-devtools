// @flow
import React, { PureComponent } from 'react';
import * as Controller from './controller';
import * as Model from './model';
import Action from './view.action';
import Logs from './view.logs';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
};

export default class Index extends PureComponent<void, Props, void> {
  render() {
    return (
      <div className="content">
        <p className="title is-1">Devtools</p>
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box">
              <Logs
                dispatch={this.props.dispatch}
                state={this.props.state}
              />
            </div>
          </div>
          <div className="tile is-vertical">
            <div className="tile is-parent">
              <div className="tile is-child box">
                <Action
                  state={this.props.state}
                />
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
