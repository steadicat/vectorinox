import * as ltx from 'ltx';
import * as path from 'path';
import * as plugins from './plugins';
import {parse, cleanup, serialize, serializeAttributes} from './utils';

const processors = [
  plugins.trimText,
  plugins.removeSvgAttributes('xmlns', 'xmlns:xlink', 'version'),
  plugins.removeTags('desc', 'title', 'defs'),
  plugins.moveGroupAttributesDown,
  plugins.removeEmptyGroups,
  plugins.applyTransforms,
  plugins.removeIds,
  plugins.gatherCommonAttributes,
];

const reactProcessors = [
  ...processors,
  plugins.changeRootTag('View', {component: 'svg'}),
  plugins.camelCaseAttributes,
  plugins.numberValues,
];

export function clean(svgString: string): string {
  let svg = parse(svgString);
  svg = processors.reduce((svg, p) => cleanup(p(svg)), svg);
  return serialize(svg);
}

export function cleanReact(svgString: string): string {
  let svg = parse(svgString);
  svg = reactProcessors.reduce((svg, p) => cleanup(p(svg)), svg);
  return serialize(svg);
}
