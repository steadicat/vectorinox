import {InheritedProp, SplicedProp} from './jsx';
import {Command} from 'd-path-parser';

export function formatNumber(n: number, precision = 3): string {
  n = parseFloat(n.toFixed(precision));
  if (isNaN(n)) console.warn('Found invalid number: ', n);
  return n.toString();
}

function float(n: number): string {
  return formatNumber(n);
}

function floatPair(x: number, y: number): string {
  return `${float(x)},${float(y)}`;
}

function boolean(x: boolean): string {
  return x ? '1' : '0';
}

export function serializeD(segments: Command[]): string {
  return segments
    .map(segment => {
      switch (segment.code) {
        case 'M':
        case 'm':
        case 'L':
        case 'l':
          return `${segment.code}${floatPair(segment.end.x, segment.end.y)}`;
        case 'H':
        case 'h':
        case 'V':
        case 'v':
          return `${segment.code}${float(segment.value)}`;
        case 'C':
        case 'c':
          const {code, cp1, cp2, end} = segment;
          return `${code}${floatPair(cp1.x, cp1.y)} ${floatPair(cp2.x, cp2.y)} ${floatPair(end.x, end.y)}`;
        case 'S':
        case 's':
          const {code: codes, cp: cps, end: ends} = segment;
          return `${codes}${floatPair(cps.x, cps.y)} ${floatPair(ends.x, ends.y)}`;
        case 'A':
        case 'a':
          const {code: codea, radii, rotation, large, clockwise, end: enda} = segment;
          return `${codea}${floatPair(radii.x, radii.y)} ${float(rotation)} ${boolean(large)} ${boolean(
            clockwise,
          )} ${floatPair(enda.x, enda.y)}`;
        default:
          return `${segment.code}`;
      }
    })
    .join(' ');
}

export function serializeAttributes(attrs: Attributes): string[] {
  return Object.keys(attrs).map(name => {
    const value = attrs[name];
    if (value instanceof InheritedProp) {
      return `${value.name}={${value.name}}`;
    } else if (value instanceof SplicedProp) {
      return `{...${value.name}}`;
    } else if (typeof value === 'number') {
      return `${name}={${value}}`;
    } else {
      return `${name}=${JSON.stringify(value)}`;
    }
  });
}

export function serialize(el: Element, indent: string = ''): string {
  const attrStrings = serializeAttributes(el.attrs);
  const attrs = attrStrings.length > 0 ? ' ' + attrStrings.join(' ') : '';
  if (el.children.length === 0) {
    return `${indent}<${el.name}${attrs} />`;
  } else {
    return [
      `${indent}<${el.name}${attrs}>`,
      ...el.children.map(
        child => (typeof child === 'string' ? indent + '  ' + child : serialize(child, indent + '  ')),
      ),
      `${indent}</${el.name}>`,
    ].join('\n');
  }
}
