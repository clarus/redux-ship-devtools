# Redux Ship DevTools
> Side effects inspector for [Redux Ship](https://github.com/clarus/redux-ship).

<img src='https://raw.githubusercontent.com/clarus/redux-ship-devtools/master/screenshot.png' alt='Screenshot' width='700px'>

The Redux Ship DevTools extension helps you visualize your [Redux Ship](https://github.com/clarus/redux-ship) programs by showing a 2D view of the side effects. There are two axis:
* vertical: effects run sequence;
* horizontal: effects run in parallel.

Install the extension and go on the [demo page](https://clarus.github.io/redux-ship/) to see an example.

## Install
### For Chrome
Download the extension on the [Chrome Web Store](https://chrome.google.com/webstore/detail/redux-ship-devtools/kbcgcifbcgamdlgdahbfangmfiofpmni).

### For Firefox
WIP

## Usage
Install the devtools connector:
```
npm install redux-ship-devtools
```
and wrap your controller:
```js
import {inspectControl} from 'redux-ship-devtools';

function dispatch(action: Controller.Action): void {
  Ship.run(Effect.run, store, inspectControl(Controller.control)(action));
}
```

## API
### `inspectControl`
```js
<Action, Effect, Commit, State>(
  control: (action: Action) => Ship<Effect, Commit, State, void>
) => (action: Action) => Ship<Effect, Commit, State, void>
```

Returns a control function sending snapshots to the Redux Ship DevTools.
