import * as ltx from 'ltx';
import * as dPathParser from 'd-path-parser';

export const parseD = dPathParser;

export function parse(svgString: string): Element {
  return ltx.parse(svgString) as Element;
}
