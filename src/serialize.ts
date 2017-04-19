
function float(n: number): string {
  return `${parseFloat(n.toFixed(3))}`;
}

function floatPair(x: number, y: number): string {
  return `${float(x)},${float(y)}`;
}

export function serializeD(segments: Segment[]): string {
  return segments.map(segment => {
    switch (segment.type) {
      case 'M':
      case 'm':
      case 'L':
      case 'l':
        return `${segment.type}${float(segment.x)},${parseFloat(float(segment.y))}`;
      case 'C':
      case 'c':
        const {type, c1x, c1y, c2x, c2y, x, y} = segment;
        return `${type}${floatPair(c1x, c1y)} ${floatPair(c2x, c2y)} ${floatPair(x, y)}`;
      default:
        return `${segment.type}`;
    }
  }).join(' ');
}

export function serializeAttributes(attrs: Attributes): string[] {
  return Object.keys(attrs).map(k => {
    return typeof attrs[k] === 'number' ? `${k}={${attrs[k]}}` : `${k}=${JSON.stringify(attrs[k])}`;
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
      ...el.children.map(child => typeof child === 'string' ? (indent + '  ' + child) : serialize(child, indent + '  ')),
      `${indent}</${el.name}>`,
    ].join('\n');
  }
}
