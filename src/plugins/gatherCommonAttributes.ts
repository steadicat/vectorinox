import {expect, describe} from '../utils';
import {serializeAttributes} from '../serialize';

const BLACKLIST = /^(x|y|width|height|points|d|cx|cy|r|rx|transform)=/;

export default function gatherCommonAttributes(el: Element): Element {
  if (typeof el === 'string') return el;
  const childElements = el.children.filter(el => typeof el !== 'string') as Element[];
  if (childElements.length > 0) {
    const attrs: {[name: string]: number} = {};
    for (let child of childElements) {
      for (let attr of serializeAttributes(child.attrs || {})) {
        if (BLACKLIST.test(attr)) continue;
        if (!attrs[attr]) attrs[attr] = 0;
        attrs[attr]++;
      }
    }
    const attrsToHoist = Object.keys(attrs).filter(k => attrs[k] > 1 && attrs[k] >= childElements.length / 2);
    for (let attr of attrsToHoist) {
      const [name, value] = attr.split('=');
      el.attrs[name] = value.substring(1, value.length - 1);
    }
    for (let child of childElements) {
      for (let k in child.attrs) {
        if (el.attrs[k] === child.attrs[k]) {
          delete child.attrs[k];
        }
      }
    }
  }
  if (el.children) {
    el.children = el.children.map(gatherCommonAttributes);
  }
  return el;
}

describe('gatherCommonAttributes', () => {
  it('should gather attributes that have quorum', () => {
    expect(
      gatherCommonAttributes,
      `<g>
        <rect stroke-width="2" stroke-color="red" />
        <circle stroke-width="2" stroke-color="red" />
        <polyline stroke-width="2" />
        <ellipsis stroke-width="2" />
        <polyline stroke-width="2" />
      </g>`,
      `<g stroke-width="2">
  <rect stroke-color="red" />
  <circle stroke-color="red" />
  <polyline />
  <ellipsis />
  <polyline />
</g>`,
    );
  });
});
