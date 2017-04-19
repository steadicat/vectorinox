import {expect, describe} from '../utils';

export default function removeIds(el: Element): Element {
  if (typeof el === 'string') return el;
  delete el.attrs['id'];
  el.children = el.children.map(removeIds);
  return el;
}

describe('removeIds', () => {
  it('should remove ids', () => {
    expect(
      removeIds,
      `<svg><g id="a"><g id="b"></g></g></svg>`,
      `<svg>
  <g>
    <g />
  </g>
</svg>`,
    );
  });

});