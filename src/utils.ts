import * as chai from 'chai';
import {trimText} from './plugins';
import {parse} from './parse';
import {serialize} from './serialize';
import {InheritedProp, SplicedProp} from './jsx';

declare global {
  interface Element {
    name: string;
    attrs: Attributes;
    children: (Element | string)[];

    attr(name: string, value: string | null): void;
  }

  type Attributes = {[name: string]: string | number | InheritedProp | SplicedProp};

  type Segment =
    | {
        type: 'M' | 'm' | 'L' | 'l';
        x: number;
        y: number;
      }
    | {
        type: 'C' | 'c';
        c1x: number;
        c1y: number;
        c2x: number;
        c2y: number;
        x: number;
        y: number;
      }
    | {
        type: 'A';
        rx: number;
        ry: number;
        xAxisRotate: number;
        largeArcFlag: number;
        sweepFlag: number;
        x: number;
        y: number;
      }
    | {
        type: 'Z';
      };
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

export const describe =
  ((global as {describe?: (desc: string, f: () => void) => void}).describe as (
    desc: string,
    f: () => void,
  ) => void) || function() {};

export function formatNumber(n: number, precision = 3): string {
  return parseFloat(n.toFixed(precision)).toString();
}
