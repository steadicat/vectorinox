import {expect, describe} from '../utils';

export default function numberValues(el: Element): Element {
  for (let k of Object.keys(el.attrs)) {
    const val = el.attrs[k];
    if (typeof val === 'string' && /^[-0-9.e]+(px)?$/.test(val)) {
      el.attrs[k] = parseFloat(val);
    }
  }
  el.children = el.children.map(numberValues);
  return el;
}

describe('numberValues', () => {
  it('should convert strings to numbers', () => {
    expect(
      numberValues,
      `<rect x="10" y="-1.0" width="10" height="10.2" stroke-color="#000" />`,
      `<rect x={10} y={-1} width={10} height={10.2} stroke-color="#000" />`,
    );
  });

});