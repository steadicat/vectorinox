import * as ltx from 'ltx';
import * as chai from 'chai';
import {trimText} from './plugins';

declare global {
  interface Element {
    name: string;
    attrs: Attributes;
    children: (Element | string)[];

    attr(name: string, value: string | null): void;
  }

  type Attributes = {[name: string]: string | number};
}

export function serializeAttributes(attrs: Attributes): string[] {
  return Object.keys(attrs).map(k => {
    return typeof attrs[k] === 'number' ? `${k}={${attrs[k]}}` : `${k}=${JSON.stringify(attrs[k])}`;
  });
}

export function parse(svgString: string): Element {
  return ltx.parse(svgString) as Element
}

export function serialize(el: Element, indent: string = ''): string {
  const attrStrings = serializeAttributes(el.attrs);
  const attrs = attrStrings.length > 0 ? ' ' + attrStrings.join(' ') : '';
  if (el.children.length === 0) {
    return `${indent}<${el.name}${attrs} />`;
  } else {
    return [
      `${indent}<${el.name}${attrs}>`,
      ...el.children.map(child => typeof child === 'string' ? (indent + '  ' + child) : serialize(child, indent + '  ')),
      `${indent}</${el.name}>`,
    ].join('\n');
  }
}

export function cleanup(el: Element): Element {
  if (el.children) {
    el.children = el.children.filter(child => child !== null).map(cleanup);
  }
  return el;
}

export function expect(processor: (el: Element) => Element, svgString: string, output: string) {
  chai.expect(serialize(cleanup(processor(cleanup(trimText(parse(svgString))))))).to.equal(output);
}

export const describe = ((global as {describe?: (desc: string, f: () => void) => void}).describe as (desc: string, f: () => void) => void) || function() {};
