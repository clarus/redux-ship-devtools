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

  renderEye() {
    return (
      <div style={{marginTop: 40}}>
        <p className="title is-2">Sequential</p>
        <p>
          <button
            className={this.buttonClassName(this.props.state.isEyeLoading)}
            onClick={this.handleClickGetEye}
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
      <div style={{marginTop: 40}}>
        <p className="title is-2">Concurrent</p>
        <p>
          <button
            className={this.buttonClassName(this.props.state.areMoviesLoading)}
            onClick={this.handleClickGetMovies}
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
      <div style={{marginTop: 40}}>
        <p className="title is-2">Nested</p>
        <p>
          <button
            className={this.buttonClassName(this.props.state.arePeopleLoading)}
            onClick={this.handleClickGetPeople}
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
        <section className="hero is-light">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Redux Ship DevTools
              </h1>
              <h2 className="subtitle">
                R2-D2
              </h2>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="content">
              <figure className="image">
                <img
                  alt="Screenshot"
                  src="https://raw.githubusercontent.com/clarus/redux-ship-devtools/master/screenshot.png"
                  style={{marginBottom: 20, maxWidth: 800}}
                />
              </figure>
              <p>
                This example demonstrates the use of the <a href="https://github.com/clarus/redux-ship-devtools">Redux Ship DevTools</a>. Install from the <a href="https://chrome.google.com/webstore/detail/redux-ship-devtools/kbcgcifbcgamdlgdahbfangmfiofpmni">Chrome store</a> and open the Chrome DevTools to get a 2D view of the side effects of this web page.
              </p>
              <ul>
                <li>vertically: sequential effects;</li>
                <li>horizontally: concurrent effects.</li>
              </ul>
              There are three kinds of effects:
              <ul>
                <li><span className="tag is-success">GetState</span> get a part of the Redux state;</li>
                <li><span className="tag is-danger">Commit</span> send a synchronous action to Redux;</li>
                <li><span className="tag is-warning">Effect</span> run a user-defined effect, such as an API call or a timer.</li>
              </ul>
              {this.renderEye()}
              {this.renderMovies()}
              {this.renderPeople()}
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                <a href="https://github.com/clarus/redux-ship-devtools/tree/master/src/example">Redux Ship DevTools Example</a> by <a href="https://github.com/clarus">Guillaume Claret</a>. The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
