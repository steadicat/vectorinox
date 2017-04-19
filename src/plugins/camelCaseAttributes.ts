import {expect, describe} from '../utils';

export default function camelCaseAttributes(el: Element): Element {
  const newAttrs: Attributes = {};
  for (let k of Object.keys(el.attrs)) {
    newAttrs[k.replace(/-([a-z])/g, (_, s) => s.toUpperCase())] = el.attrs[k];
  }
  el.attrs = newAttrs;
  el.children = el.children.map(camelCaseAttributes);
  return el;
}

describe('camelCaseAttributes', () => {
  it('should camel case dashed attributes', () => {
    expect(
      camelCaseAttributes,
      `<rect stroke-width="2" />`,
      `<rect strokeWidth="2" />`,
    );
  });
});