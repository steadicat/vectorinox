import {expect, describe} from '../utils';

export default function trimText(el: Element): Element {
  el.children = el.children.map(child => {
    if (typeof child !== 'string') return trimText(child);
    child = child.replace(/\s+/g, '');
    if (!child) return null;
    return child;
  })
  return el;
}

describe('trimText', () => {
  it('should trim text', () => {
    expect(trimText, `<text>
       text   
       </text>`, `<text>
  text
</text>`);
  });
});