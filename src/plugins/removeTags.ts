import {expect, describe} from '../utils';

export default function removeTags(...tags: string[]) {
  return function remove(el: Element) {
    if (tags.indexOf(el.name) >= 0) return null;
    if (el.children) {
      el.children = el.children.map(remove);
    }
    return el;
  }
}

describe('removeTags', () => {
  it('should remove the tags', () => {
    expect(
      removeTags('defs', 'title'),
      `<svg><g><defs><g></g></defs></g><title>title</title></svg>`,
      `<svg>
  <g />
</svg>`,
    );
  });

});