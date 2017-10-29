import {expect, describe, formatNumber} from '../utils';
import {parseD} from '../parse';
import {serializeD} from '../serialize';

type Vector = [number, number, number];
type Matrix = [number, number, number, number, number, number, number, number, number];

function multiply(a: Matrix, b: Matrix): Matrix {
  return [
    a[0] * b[0] + a[1] * b[3] + a[2] * b[6],
    a[0] * b[1] + a[1] * b[4] + a[2] * b[7],
    a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
    a[3] * b[0] + a[4] * b[3] + a[5] * b[6],
    a[3] * b[1] + a[4] * b[4] + a[5] * b[7],
    a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
    a[6] * b[0] + a[7] * b[3] + a[8] * b[6],
    a[6] * b[1] + a[7] * b[4] + a[8] * b[7],
    a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
  ];
}

function multiplyVector(a: Matrix, v: Vector): Vector {
  return [
    a[0] * v[0] + a[1] * v[1] + a[2] * v[2],
    a[3] * v[0] + a[4] * v[1] + a[5] * v[2],
    a[6] * v[0] + a[7] * v[1] + a[8] * v[2],
  ];
}

function parseTransform(transform: string): [Matrix, string] {
  let matrix: Matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  let match;
  const re = /(\w+)\(([-0-9e.]+\s*(,\s*[-0-9e.]+)*)\)/g;
  const remainingTransforms = [];
  while ((match = re.exec(transform))) {
    const [, op, paramsString] = match;
    const params = paramsString.split(',').map(parseFloat);
    let m: Matrix;
    switch (op) {
      case 'translate':
        let [tx, ty] = params;
        m = [1, 0, tx, 0, 1, ty, 0, 0, 1];
        matrix = multiply(matrix, m);
        break;
      case 'scale':
        let [sx, sy] = params;
        m = [sx, 0, 0, 0, sy, 0, 0, 0, 1];
        matrix = multiply(matrix, m);
        break;
      case 'rotate':
        let [a] = params;
        a = a * Math.PI / 180;
        m = [Math.cos(a), -Math.sin(a), 0, Math.sin(a), Math.cos(a), 0, 0, 0, 1];
        matrix = multiply(matrix, m);
        break;
      default:
        console.warn(`Unknown transform ${op}`);
        remainingTransforms.push(match[0]);
    }
  }
  return [matrix, remainingTransforms.join(' ')];
}

function applyMatrixToD(matrix: Matrix, d: string): string {
  const segments = parseD(d);
  for (let segment of segments) {
    switch (segment.type) {
      case 'M':
      case 'm':
      case 'L':
      case 'l':
        const [nx, ny] = multiplyVector(matrix, [segment.x, segment.y, 1]);
        segment.x = nx;
        segment.y = ny;
        break;
      case 'C':
      case 'c':
        const [c1x, c1y] = multiplyVector(matrix, [segment.c1x, segment.c1y, 1]);
        const [c2x, c2y] = multiplyVector(matrix, [segment.c2x, segment.c2y, 1]);
        const [cx, cy] = multiplyVector(matrix, [segment.x, segment.y, 1]);
        segment.c1x = c1x;
        segment.c1y = c1y;
        segment.c2x = c2x;
        segment.c2y = c2y;
        segment.x = cx;
        segment.y = cy;
        break;
      case 'Z':
        break;
      default:
        console.warn(`Segment transform not implemented: ${segment.type}`);
    }
  }
  return serializeD(segments);
}

function applyMatrixToPoints(matrix: Matrix, points: string): string {
  const p = points.split(' ');
  const newPoints = [];
  for (let i = 0; i < p.length; i += 2) {
    const x = parseFloat(p[i]);
    const y = parseFloat(p[i + 1]);
    const vector: Vector = [x, y, 1];
    const [nx, ny] = multiplyVector(matrix, vector);
    newPoints.push(formatNumber(nx));
    newPoints.push(formatNumber(ny));
  }
  return newPoints.join(' ');
}

function applyMatrixToR(matrix: Matrix, r: string): string {
  const [cx, cy] = multiplyVector(matrix, [0, 0, 1]);
  const [drx] = multiplyVector(matrix, [parseFloat(r), 0, 1]);
  const [, dry] = multiplyVector(matrix, [0, parseFloat(r), 1]);
  const rx = drx - cx;
  const ry = dry - cy;
  if (rx !== ry) {
    console.warn('Circle transformed into an ellipsis... not implemeted yet.');
  }
  return formatNumber(rx);
}

function applyMatrixToX(matrix: Matrix, x: string): string {
  const vector: Vector = [parseFloat(x), 0, 1];
  const [nx] = multiplyVector(matrix, vector);
  return formatNumber(nx);
}

function applyMatrixToY(matrix: Matrix, y: string): string {
  const vector: Vector = [0, parseFloat(y), 1];
  const [, ny] = multiplyVector(matrix, vector);
  return formatNumber(ny);
}

/*
function hasRotation(matrix: Matrix): boolean {
  return matrix[1] !== 0 || matrix[3] !== 0;
}
*/

function convertRectToPolygon(el: Element) {
  // Punt on rects with corner radii
  if (el.attrs['rx']) return;
  el.name = 'polygon';
  const x = parseFloat(el.attrs['x'] as string);
  const y = parseFloat(el.attrs['y'] as string);
  const width = parseFloat(el.attrs['width'] as string);
  const height = parseFloat(el.attrs['height'] as string);
  const points = [x, y, x + width, y, x + width, y + height, x, y + height];
  el.attrs['points'] = points.map(formatNumber).join(' ');
  delete el.attrs['x'];
  delete el.attrs['y'];
  delete el.attrs['width'];
  delete el.attrs['height'];
}

function convertPolygonToRect(el: Element) {
  const [x0, y0, x1, y1, x2, y2, x3, y3, ...rest] = (el.attrs['points'] as string).split(' ').map(parseFloat);
  if (rest.length > 0) {
    if (rest.length !== 2) return;
    const [x4, y4] = rest;
    if (x0 !== x4 || y0 !== y4) return;
  }
  let width = 0;
  let height = 0;
  if (y0 === y1 && x1 === x2 && y2 === y3 && x3 === x0) {
    width = Math.abs(x1 - x0);
    height = Math.abs(y2 - y1);
  } else if (x0 === x1 && y1 === y2 && x2 === x3 && y3 === y0) {
    width = Math.abs(x2 - x1);
    height = Math.abs(y1 - y0);
  } else {
    return;
  }
  el.name = 'rect';
  el.attrs['x'] = formatNumber(Math.min(x0, x1, x2, x3));
  el.attrs['y'] = formatNumber(Math.min(y0, y1, y2, y3));
  el.attrs['width'] = formatNumber(width);
  el.attrs['height'] = formatNumber(height);
  delete el.attrs['points'];
}

const transformsByElement = {
  rect(el: Element, matrix: Matrix) {
    convertRectToPolygon(el);
    if (el.name !== 'polygon') return false;
    transformsByElement.polygon(el, matrix);
    convertPolygonToRect(el);
    return true;
  },

  polygon(el: Element, matrix: Matrix) {
    el.attrs['points'] = applyMatrixToPoints(matrix, el.attrs['points'] as string);
    return true;
  },

  polyline(el: Element, matrix: Matrix) {
    el.attrs['points'] = applyMatrixToPoints(matrix, el.attrs['points'] as string);
    return true;
  },

  path(el: Element, matrix: Matrix) {
    el.attrs['d'] = applyMatrixToD(matrix, el.attrs['d'] as string);
    return true;
  },

  circle(el: Element, matrix: Matrix) {
    el.attrs['cx'] = applyMatrixToX(matrix, el.attrs['cx'] as string);
    el.attrs['cy'] = applyMatrixToY(matrix, el.attrs['cy'] as string);
    el.attrs['r'] = applyMatrixToR(matrix, el.attrs['r'] as string);
    return true;
  },
};

// if (el.attrs['x']) el.attrs['x'] = applyMatrixToX(matrix, el.attrs['x'] as string);
// if (el.attrs['y']) el.attrs['y'] = applyMatrixToY(matrix, el.attrs['y'] as string);

export default function applyTransforms(el: Element): Element {
  if (el.attrs['transform']) {
    const [matrix] = parseTransform(el.attrs['transform'] as string);
    if (matrix) {
      const transform = transformsByElement[el.name as keyof typeof transformsByElement];
      if (transform) {
        const success = transform(el, matrix);
        if (success) {
          delete el.attrs['transform'];
        }
      }
    }
  }
  if (el.children) {
    el.children = el.children.map(applyTransforms);
  }
  return el;
}

describe('applyTransforms', () => {
  it('should translate rects', () => {
    expect(
      applyTransforms,
      `<rect x="0" y="0" width="10" height="10" transform="translate(10, 10)" />`,
      `<rect x="10" y="10" width="10" height="10" />`,
    );
  });

  it('should scale rects', () => {
    expect(
      applyTransforms,
      `<rect x="0" y="0" width="10" height="10" transform="scale(2, 2)" />`,
      `<rect x="0" y="0" width="20" height="20" />`,
    );
  });

  it('should rotate rects 90 degrees', () => {
    expect(
      applyTransforms,
      `<rect x="0" y="0" width="10" height="20" transform="rotate(90)" />`,
      `<rect x="-20" y="0" width="20" height="10" />`,
    );
  });

  it('should rotate rects 45 degrees', () => {
    expect(
      applyTransforms,
      `<rect x="0" y="0" width="10" height="10" transform="rotate(45)" />`,
      `<polygon points="0 0 7.071 7.071 0 14.142 -7.071 7.071" />`,
    );
  });

  it('should mix simple transforms with complex ones', () => {
    expect(
      applyTransforms,
      `<rect x="0" y="0" width="10" height="10" transform="translate(20, 20) rotate(45) scale(2, 2)" />`,
      `<polygon points="20 20 34.142 34.142 20 48.284 5.858 34.142" />`,
    );
  });

  it('should translate circles', () => {
    expect(
      applyTransforms,
      `<circle cx="0" cy="0" r="10" transform="translate(10, 10)" />`,
      `<circle cx="10" cy="10" r="10" />`,
    );
  });

  it('should scale circles', () => {
    expect(
      applyTransforms,
      `<circle cx="0" cy="0" r="10" transform="scale(2, 2)" />`,
      `<circle cx="0" cy="0" r="20" />`,
    );
  });

  it('should translate polygons', () => {
    expect(
      applyTransforms,
      `<polygon points="0 0 10 20" transform="translate(10, 10)" />`,
      `<polygon points="10 10 20 30" />`,
    );
  });

  it('should translate polylines', () => {
    expect(
      applyTransforms,
      `<polyline points="0 0 10 20" transform="translate(10, 10)" />`,
      `<polyline points="10 10 20 30" />`,
    );
  });

  it('should scale polylines', () => {
    expect(
      applyTransforms,
      `<polyline points="0 0 10 20" transform="scale(2, 2)" />`,
      `<polyline points="0 0 20 40" />`,
    );
  });

  it('should rotate polylines', () => {
    expect(
      applyTransforms,
      `<polyline points="0 0 10 10" transform="rotate(45)" />`,
      `<polyline points="0 0 0 14.142" />`,
    );
  });

  it('should rotate paths', () => {
    expect(
      applyTransforms,
      `<path d="M13,13 L23,23" transform="translate(18.000000, 18.000000) rotate(-90.000000) translate(-18.000000, -18.000000) "></path>`,
      `<path d="M13,23 L23,13" />`,
    );
  });

  it('should preserve transforms it cannot handle', () => {
    expect(
      applyTransforms,
      `<rect transform="rotate(-45.000000)" x="50.7071068" y="39.2218254" width="4"
      height="14.9705627" rx="2"></rect>`,
      `<rect transform="rotate(-45.000000)" x="50.7071068" y="39.2218254" width="4" height="14.9705627" rx="2" />`,
    );
  });

  xit('should support rotations around on a non-zero point', () => {
    expect(
      applyTransforms,
      `<rect transform="translate(52.707107, 46.707107) rotate(-45.000000) translate(-52.707107, -46.707107)" x="50.7071068" y="39.2218254" width="4"
      height="14.9705627" rx="2"></rect>`,
      `<rect transform="rotate(-45.000000, 52.707107, 46.707107)" x="50.7071068" y="39.2218254" width="4" height="14.9705627" rx="2" />`,
    );
  });
});
