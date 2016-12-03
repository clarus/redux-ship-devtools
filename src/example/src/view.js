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

  handleClickGetPeople = (): void => {
    this.props.dispatch({
      type: 'GetPeople',
    });
  };

  buttonClassName(isLoading: bool): string {
    return 'button is-primary' + (isLoading ? ' is-loading' : '');
  }

  buttonStyle = {
    marginTop: 15,
  };

  renderEye() {
    return (
      <div>
        <p className="is-marginless">
          <button
            className={this.buttonClassName(this.props.state.isEyeLoading)}
            onClick={this.handleClickGetEye}
            style={this.buttonStyle}
          >
            Get eye
          </button>
        </p>
        <p>{this.props.state.eye}</p>
      </div>
    );
  }

  renderMovies() {
    return (
      <div>
        <p>
          <button
            className={this.buttonClassName(this.props.state.areMoviesLoading)}
            onClick={this.handleClickGetMovies}
            style={this.buttonStyle}
          >
            Get movies
          </button>
        </p>
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

  renderPeopleResults(people: {homeWorld: string[], species: string[]}) {
    return (
      <div>
        <p>People of species</p>
        <ul>
          {people.species.map(people =>
            <li key={people}>{people}</li>
          )}
        </ul>
        <p>People of home world</p>
        <ul>
          {people.homeWorld.map(people =>
            <li key={people}>{people}</li>
          )}
        </ul>
      </div>
    );
  }

  renderPeople() {
    return (
      <div>
        <p>
          <button
            className={this.buttonClassName(this.props.state.arePeopleLoading)}
            onClick={this.handleClickGetPeople}
            style={this.buttonStyle}
          >
            Get people of species and home world
          </button>
        </p>
        {this.props.state.people && this.renderPeopleResults(this.props.state.people)}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderEye()}
        {this.renderMovies()}
        {this.renderPeople()}
      </div>
    );
  }
}
