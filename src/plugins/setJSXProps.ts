import {expect, describe} from '../utils';
import {InheritedProp, SplicedProp} from '../jsx';

export default function setJSXProps(
  props: Attributes = {},
  inheritedProps: string[] = [],
  splicedProps: string[] = [],
) {
  return (el: Element) => {
    el.attrs = {...el.attrs, ...props};
    for (let prop of inheritedProps) {
      el.attrs[prop] = new InheritedProp(prop);
    }
    for (let prop of splicedProps) {
      el.attrs[prop] = new SplicedProp(prop);
    }
    return el;
  };
}

describe('setJSXProps', () => {
  it('should add constant props', () => {
    expect(
      setJSXProps({fill: '#000', stroke: '#ccc'}),
      `<svg><rect /></svg>`,
      `<svg fill="#000" stroke="#ccc">
  <rect />
</svg>`,
    );
  });

  it('should add inherited props', () => {
    expect(
      setJSXProps({}, ['fill', 'stroke']),
      `<svg><rect /></svg>`,
      `<svg fill={fill} stroke={stroke}>
  <rect />
</svg>`,
    );
  });

  it('should add spliced props', () => {
    expect(
      setJSXProps({}, ['fill', 'stroke'], ['props']),
      `<svg viewBox="0 0 20 20"><rect /></svg>`,
      `<svg viewBox="0 0 20 20" fill={fill} stroke={stroke} {...props}>
  <rect />
</svg>`,
    );
  });
});
