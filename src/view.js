// @flow
import React, { PureComponent } from 'react';
import * as Controller from './controller';
import * as Model from './model';
import Content from './view.content';
import Devtools from './view.devtools';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
};

export default class Index extends PureComponent<void, Props, void> {
  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile notification is-children">
                <Content
                  dispatch={this.props.dispatch}
                  state={this.props.state}
                />
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile notification is-children">
                <Devtools />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
