# Redux Ship DevTools
> Side effects inspector for [Redux Ship](https://github.com/clarus/redux-ship).

[![Screenshot](https://raw.githubusercontent.com/clarus/redux-ship-devtools/screenshots/animation.gif)](https://clarus.github.io/redux-ship-devtools/)

The Redux Ship DevTools show a 2D view of the side effects of a [Redux Ship](https://github.com/clarus/redux-ship) program:
* vertically: sequential side effects;
* horizontally: concurrent side effects.

Go to the [demo page](https://clarus.github.io/redux-ship-devtools/) to see a live example :rocket:.

## Install
Download the extension on the [Chrome Web Store](https://chrome.google.com/webstore/detail/redux-ship-devtools/kbcgcifbcgamdlgdahbfangmfiofpmni) (other platforms are not supported yet).

## Usage
To enable the Redux Ship DevTools extension in a project you need to connect it to your code. For that, install the devtools package:
```
npm install redux-ship-devtools
```
and wrap your controller:
```js
import * as ShipDevTools from 'redux-ship-devtools';

function dispatch(action: Controller.Action): void {
  Ship.run(Effect.run, store, ShipDevTools.inspect(Controller.control)(action));
}
```

## API
### `inspect`
```js
<Action, Effect, Commit, State, A>(
  control: (action: Action) => Ship<Effect, Commit, State, A>
) => (action: Action) => Ship<Effect, Commit, State, A>
```

Returns a function behaving as `control` but sending snapshots to the Redux Ship DevTools.
