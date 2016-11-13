// @flow
import React, { PureComponent } from 'react';
import * as Controller from './controller';
import * as Model from './model';

type Props = {
  dispatch: (action: Controller.Action) => void,
  state: Model.State,
};

export default class Index extends PureComponent<void, Props, void> {
  handleClickGetEye = (): void => {
    this.props.dispatch({
      type: 'GetEye',
    });
  };

  handleClickGetMovies = (): void => {
    this.props.dispatch({
      type: 'GetMovies',
    });
  };

  render() {
    return (
      <div className="content">
        <p className="title is-1">Content</p>
        <button onClick={this.handleClickGetEye}>
          Get eye
        </button>
        <p>{this.props.state.eye}</p>
        <button onClick={this.handleClickGetMovies}>
          Get movies
        </button>
        {this.props.state.movies &&
          <ul>
            {this.props.state.movies.map(movie =>
              <li key={movie}>{movie}</li>
            )}
          </ul>
        }
      </div>
    );
  }
}
