import {expect, describe} from '../utils';

export default function removeSvgAttributes(...attrs: string[]) {
  return (el: Element) => {
    for (let attr of attrs) {
      delete el.attrs[attr];
    }
    return el;
  };
}


describe('removeSvgAttributes', () => {
  it('should remove ids', () => {
    expect(
      removeSvgAttributes('viewport', 'id'),
      `<svg version="1.1" viewport="0 0 10 10" id="x"><g id="a"><g id="b"></g></g></svg>`,
      `<svg version="1.1">
  <g id="a">
    <g id="b" />
  </g>
</svg>`,
    );
  });

});