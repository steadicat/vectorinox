import {expect, describe} from '../utils';

export default function moveGroupAttributesDown(el: Element): Element {
  if (el.name === 'g') {
    el.children = el.children.map(child => {
      if (typeof child === 'string') return child;
      const newAttrs = {...el.attrs, ...child.attrs};
      if (el.attrs['transform'] && child.attrs['transform']) {
        newAttrs['transform'] = el.attrs['transform'] + ' ' + child.attrs['transform'];
      }
      child.attrs = newAttrs;
      return moveGroupAttributesDown(child);
    });
    el.attrs = {};
  } else if (el.children) {
    el.children = el.children.map(moveGroupAttributesDown);
  }
  return el;
}

describe('moveGroupAttributesDown', () => {
  it('should move attributes from group to children', () => {
    expect(
      moveGroupAttributesDown,
      `<g stroke-width="2">
  <rect stroke-color="red" />
  <circle stroke-color="red" />
  <g stroke-color="orange">
    <polyline />
    <ellipsis stroke-color="blue" />
  </g>
  <polyline />
</g>`,
      `<g>
  <rect stroke-width="2" stroke-color="red" />
  <circle stroke-width="2" stroke-color="red" />
  <g>
    <polyline stroke-width="2" stroke-color="orange" />
    <ellipsis stroke-width="2" stroke-color="blue" />
  </g>
  <polyline stroke-width="2" />
</g>`,
    );
  });

  it('should concatenate transforms', () => {
    expect(
      moveGroupAttributesDown,
      `<g transform="translate(2, 2)">
  <g transform="scale(2, 2)">
    <polyline transform="rotate(90)" />
    <ellipsis />
  </g>
  <polyline />
</g>`,
      `<g>
  <g>
    <polyline transform="translate(2, 2) scale(2, 2) rotate(90)" />
    <ellipsis transform="translate(2, 2) scale(2, 2)" />
  </g>
  <polyline transform="translate(2, 2)" />
</g>`,
    );
  });
});