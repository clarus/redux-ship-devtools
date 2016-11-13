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

  buttonClassName(isLoading: bool): string {
    return 'button is-primary' + (isLoading ? ' is-loading' : '');
  }

  renderEye() {
    return (
      <div className="box">
        <button
          className={this.buttonClassName(this.props.state.isEyeLoading)}
          onClick={this.handleClickGetEye}
        >
          Get eye
        </button>
        <p>{this.props.state.eye}</p>
      </div>
    );
  }

  renderMovies() {
    return (
      <div className="box">
        <button
          className={this.buttonClassName(this.props.state.areMoviesLoading)}
          onClick={this.handleClickGetMovies}
        >
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

  render() {
    return (
      <div className="content">
        <p className="title is-1">Content</p>
        <p className="subtitle is-3">R2-D2</p>
        {this.renderEye()}
        {this.renderMovies()}
      </div>
    );
  }
}
