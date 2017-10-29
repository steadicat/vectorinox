import * as ltx from 'ltx';

const segmentRe = /([MmLlCcAZ])([^MmLlCcAZ]*)/gi;
// const numberRe = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig;

export function parseD(d: string): Segment[] {
  const segments: Segment[] = [];
  let match;
  while ((match = segmentRe.exec(d))) {
    const [, letter, numbersString] = match;
    const numbers = numbersString.split(/[,\s]+/).map(parseFloat);
    switch (letter) {
      case 'M':
      case 'm':
      case 'L':
      case 'l':
        const [x, y] = numbers;
        segments.push({type: letter, x, y});
        break;
      case 'C':
      case 'c':
        const [c1x, c1y, c2x, c2y, cx, cy] = numbers;
        segments.push({type: letter, c1x, c1y, c2x, c2y, x: cx, y: cy});
        break;
      case 'A':
        const [rx, ry, xAxisRotate, largeArcFlag, sweepFlag, ax, ay] = numbers;
        segments.push({type: letter, rx, ry, xAxisRotate, largeArcFlag, sweepFlag, x: ax, y: ay});
        break;
      case 'Z':
        segments.push({type: 'Z'});
        break;
      default:
        console.warn(`Error parsing point: ${match[0]}`);
    }
  }
  segmentRe.lastIndex = 0;
  return segments;
}

export function parse(svgString: string): Element {
  return ltx.parse(svgString) as Element;
}
