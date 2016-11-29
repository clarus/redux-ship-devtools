// @flow
import * as Ship from 'redux-ship';

export type Effect = {
  type: 'HttpRequest',
  url: string,
};

export async function run(effect: Effect): Promise<any> {
  switch (effect.type) {
  case 'HttpRequest': {
    const response = await fetch(effect.url.replace('http://', 'https://'));
    return await response.json();
  }
  default:
    return;
  }
}

export function httpRequest<Commit, State>(url: string): Ship.Ship<Effect, Commit, State, any> {
  return Ship.call({
    type: 'HttpRequest',
    url,
  });
}
