import * as plugins from './plugins';
import {cleanup} from './utils';
import {parse} from './parse';
import {serialize} from './serialize';

const processors = [
  plugins.trimText,
  plugins.removeSvgAttributes('xmlns:xlink', 'version'),
  plugins.removeTags('desc', 'title', 'defs'),
  plugins.moveGroupAttributesDown,
  plugins.removeEmptyGroups,
  plugins.applyTransforms,
  plugins.removeIds,
  plugins.gatherCommonAttributes,
];

const jsxProcessors = [
  plugins.removeSvgAttributes('xmlns'),
  plugins.camelCaseAttributes,
  plugins.numberValues,
];

export function clean(svgString: string): string {
  let svg = parse(svgString);
  svg = processors.reduce((svg, p) => cleanup(p(svg)), svg);
  return serialize(svg);
}

export function cleanJSX(
  svgString: string,
  jsxTag = 'svg',
  jsxProps: Attributes = {},
  jsxInheritProps: string[] = [],
  jsxSpliceProps: string[] = [],
): string {
  let svg = parse(svgString);
  svg = processors.reduce((svg, p) => cleanup(p(svg)), svg);
  svg = jsxProcessors.reduce((svg, p) => cleanup(p(svg)), svg);
  svg = plugins.changeRootTag(jsxTag, jsxProps)(svg);
  svg = plugins.setJSXProps(jsxProps, jsxInheritProps, jsxSpliceProps)(svg);
  return serialize(svg);
}
