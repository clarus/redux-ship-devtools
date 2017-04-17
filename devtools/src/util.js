// @flow
import type {SnapshotItem} from 'redux-ship';

export function snapshotItemClassName(snapshotItem: SnapshotItem<mixed, mixed>): string {
  switch (snapshotItem.type) {
    case 'Effect':
      return 'is-warning';
    case 'Commit':
      return 'is-danger';
    case 'GetState':
      return 'is-success';
    default:
      return '';
  }
}

function taggedUnionTitle(taggedUnion: mixed): ?string {
  if (typeof taggedUnion === 'object' && taggedUnion !== null &&
    typeof taggedUnion.type == 'string'
  ) {
    const {type} = taggedUnion;
    const subTitle = Object.keys(taggedUnion)
      .sort()
      .reduce(
        (accumulator: ?string, key) =>
          !accumulator && typeof taggedUnion === 'object' && taggedUnion !== null ?
            taggedUnionTitle(taggedUnion[key]) :
            accumulator,
        null
      );
    return subTitle ? `${type}/${subTitle}` : type;
  }
  return null;
}

function taggedUnionTitleOrDefault(taggedUnion: mixed): string {
  return taggedUnionTitle(taggedUnion) || 'unknown';
}

export function actionTitle(action: mixed): string {
  return taggedUnionTitleOrDefault(action);
}

export function snapshotItemTitle(snapshotItem: SnapshotItem<mixed, mixed>): string {
  switch (snapshotItem.type) {
    case 'Commit':
      return taggedUnionTitleOrDefault(snapshotItem.commit);
    case 'Effect':
      return taggedUnionTitleOrDefault(snapshotItem.effect);
    default:
      return snapshotItem.type;
  }
}
