import {expect, describe} from '../utils';

export default function removeEmptyGroups(el: Element): Element {
  if (typeof el === 'string') return el;
  const children = el.children.map(removeEmptyGroups);
  let newChildren: (Element | string)[] = [];
  for (let child of children) {
    if (typeof child !== 'string' && child.name === 'g' && (Object.keys(child.attrs).length === 0 || child.children.length === 0)) {
      newChildren = [...newChildren, ...child.children];
    } else {
      newChildren.push(child);
    }
  }
  el.children = newChildren;
  return el;
}

describe('removeEmptyGroups', () => {
  it('should remove groups with no attributes', () => {
    expect(
      removeEmptyGroups,
      `<svg><g><g></g></g><g><rect /></g></svg>`,
      `<svg>
  <rect />
</svg>`,
    );
  });

  it('should remove groups with no children', () => {
    expect(
      removeEmptyGroups,
      `<svg><g stroke-width="2"><g></g></g><g><rect /></g></svg>`,
      `<svg>
  <rect />
</svg>`,
    );
  });

});