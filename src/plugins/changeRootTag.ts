import {expect, describe} from '../utils';

export default function changeRootTag(name: string, attrs: Attributes = {}) {
  return (el: Element) => {
    el.name = name;
    el.attrs = {...el.attrs, ...attrs};
    return el;
  };
}

describe('changeRootTag', () => {
  it('should change the tag', () => {
    expect(
      changeRootTag('View'),
      `<svg version="1.1" viewBox="0 0 10 10"><rect /></svg>`,
      `<View version="1.1" viewBox="0 0 10 10">
  <rect />
</View>`,
    );
  });

  it('should set attributes', () => {
    expect(
      changeRootTag('svg', {id: 'svg'}),
      `<svg version="1.1" viewBox="0 0 10 10"><rect /></svg>`,
      `<svg version="1.1" viewBox="0 0 10 10" id="svg">
  <rect />
</svg>`,
    );
  });

  it('should override attributes', () => {
    expect(
      changeRootTag('View', {component: 'svg', viewBox: '0 0 10 10'}),
      `<svg version="1.1" viewBox="0 0 20 20"><rect /></svg>`,
      `<View version="1.1" viewBox="0 0 10 10" component="svg">
  <rect />
</View>`,
    );
  });
});
