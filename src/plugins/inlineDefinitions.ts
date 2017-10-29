import {expect, describe} from '../utils';

type Definitions = {[id: string]: Element};

function findDefinitions(el: Element): Definitions {
  if (typeof el === 'string') return null;
  const childElements = el.children.filter(el => typeof el !== 'string') as Element[];
  if (el.name !== 'defs') {
    for (const child of childElements) {
      const definitions = findDefinitions(child);
      if (definitions) return definitions;
    }
    return null;
  }
  const definitions: Definitions = {};
  for (const child of childElements) {
    definitions[child.attrs['id'] as string] = child;
  }
  return definitions;
}

function insertDefinitions(el: Element | string, definitions: Definitions): Element | string {
  if (typeof el === 'string') return el;
  if (el.name === 'use') {
    const ref = (el.attrs['xlink:href'] as string).replace(/^#/, '');
    const def = definitions[ref];
    if (def) {
      el.name = def.name;
      el.attrs = {...def.attrs, ...el.attrs};
      delete el.attrs['xlink:href'];
      delete el.attrs['id'];
    }
  }
  if (el.children) {
    el.children = el.children.map(child => insertDefinitions(child, definitions));
  }
  return el;
}

export default function inlineDefinitions(el: Element): Element {
  const definitions = findDefinitions(el);
  return insertDefinitions(el, definitions) as Element;
}

describe('inlineDefinitions', () => {
  it('should inline definitions', () => {
    expect(
      inlineDefinitions,
      `<svg>
    <defs>
      <polygon id="path-1" points="266.18 12.3422713 280 14.3335962 270 23.9353312 272.36 37.5 260 31.0922713 247.64 37.5 250 23.9353312 240 14.3335962 253.82 12.3422713 260 0" />
    </defs>
    <use fill-opacity="0" fill="#A0A3B1" fill-rule="evenodd" xlink:href="#path-1"></use>
  </svg>`,
      `<svg>
  <defs>
    <polygon id="path-1" points="266.18 12.3422713 280 14.3335962 270 23.9353312 272.36 37.5 260 31.0922713 247.64 37.5 250 23.9353312 240 14.3335962 253.82 12.3422713 260 0" />
  </defs>
  <polygon points="266.18 12.3422713 280 14.3335962 270 23.9353312 272.36 37.5 260 31.0922713 247.64 37.5 250 23.9353312 240 14.3335962 253.82 12.3422713 260 0" fill-opacity="0" fill="#A0A3B1" fill-rule="evenodd" />
</svg>`,
    );
  });
});
