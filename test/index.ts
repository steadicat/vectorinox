import {clean, cleanJSX} from '../src/index';
import {expect} from 'chai';

describe('Clean plain SVG', () => {
  it('should clean a complex icon', () => {
    const cleaned = clean(`<svg width="48px" height="48px" viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 43.1 (39012) - http://www.bohemiancoding.com/sketch -->
    <title>coupon</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="coupon">
            <g id="Group-2" transform="translate(23.000000, 14.500000) scale(1, -1) translate(-23.000000, -14.500000) translate(1.000000, 1.000000)" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6,26 C9.3137085,26 12,23.5 12,20 C12,19 11.8364327,17.9907018 12,17.5 C12.5,16 14,15.5 15,15 C16,14.5 43.5,3 43.5,3 C42,-0.5 39.5,0.5 38,1 C34.9998199,2.00006005 20.2478382,7.96521219 19,8.5 C15.5,10 16,11.5 14,12.5 C10.1195693,14.2038467 14,12.5 10.1195693,14.2038467 C9.37920688,14.5289302 7.12200036,14 6,14 C2.6862915,14 0,16.6862915 0,20 C0,23.3137085 2.6862915,26 6,26 Z" id="Oval-8" fill="#FFFFFF"></path>
                <circle id="Oval-8" cx="6" cy="20" r="3"></circle>
            </g>
            <rect id="Rectangle-7" stroke="#444444" stroke-width="2" fill="#FFD0D8" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="4,4" x="22" y="18" width="25" height="26" rx="2"></rect>
            <g id="Group-3" transform="translate(32.000000, 24.000000)" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6.04545455,4.45454545 C6.04545455,3 4.5,2.5 3,2.5 C1.5,2.5 0,3 0,4.45454545 C1.11584553e-16,7.31818182 6.04545455,6.31818182 6.04545455,9.5 C6.04545455,11.0909091 4.59090909,12 3,12 C1.40909091,12 4.41565976e-17,11.2727273 0,10" id="Path-5"></path>
                <path d="M3,2.22727273 L3,0.318181818" id="Line"></path>
                <path d="M3,13.6818182 L3,12" id="Line"></path>
            </g>
            <path d="M7,32 C10.3137085,32 13,29.5 13,26 C13,25 12.8364327,23.9907018 13,23.5 C13.5,22 15,21.5 16,21 C17,20.5 44.5,9 44.5,9 C43,5.5 40.5,6.5 39,7 C35.9998199,8.00006005 21.2478382,13.9652122 20,14.5 C16.5,16 17,17.5 15,18.5 C11.1195693,20.2038467 15,18.5 11.1195693,20.2038467 C10.3792069,20.5289302 8.12200036,20 7,20 C3.6862915,20 1,22.6862915 1,26 C1,29.3137085 3.6862915,32 7,32 Z" id="Oval-8" stroke="#444444" stroke-width="2" fill="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle id="Oval-8" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" cx="7" cy="26" r="3"></circle>
            <circle id="Oval" fill="#444444" cx="20" cy="17" r="1"></circle>
        </g>
    </g>
</svg>`);
    expect(cleaned).to
      .equal(`<svg width="48px" height="48px" viewBox="0 0 48 48" stroke="#444444" stroke-width="2" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" fill="none">
  <path fill="#FFFFFF" d="M7,2 C10.314,2 13,4.5 13,8 C13,9 12.836,10.009 13,10.5 C13.5,12 15,12.5 16,13 C17,13.5 44.5,25 44.5,25 C43,28.5 40.5,27.5 39,27 C36,26 21.248,20.035 20,19.5 C16.5,18 17,16.5 15,15.5 C11.12,13.796 15,15.5 11.12,13.796 C10.379,13.471 8.122,14 7,14 C3.686,14 1,11.314 1,8 C1,4.686 3.686,2 7,2 Z" />
  <circle cx="7" cy="8" r="3" />
  <rect fill="#FFD0D8" stroke-dasharray="4,4" x="22" y="18" width="25" height="26" rx="2" />
  <path d="M38.045,28.455 C38.045,27 36.5,26.5 35,26.5 C33.5,26.5 32,27 32,28.455 C32,31.318 38.045,30.318 38.045,33.5 C38.045,35.091 36.591,36 35,36 C33.409,36 32,35.273 32,34" />
  <path d="M35,26.227 L35,24.318" />
  <path d="M35,37.682 L35,36" />
  <path fill="#FFFFFF" d="M7,32 C10.3137085,32 13,29.5 13,26 C13,25 12.8364327,23.9907018 13,23.5 C13.5,22 15,21.5 16,21 C17,20.5 44.5,9 44.5,9 C43,5.5 40.5,6.5 39,7 C35.9998199,8.00006005 21.2478382,13.9652122 20,14.5 C16.5,16 17,17.5 15,18.5 C11.1195693,20.2038467 15,18.5 11.1195693,20.2038467 C10.3792069,20.5289302 8.12200036,20 7,20 C3.6862915,20 1,22.6862915 1,26 C1,29.3137085 3.6862915,32 7,32 Z" />
  <circle cx="7" cy="26" r="3" />
  <circle stroke="none" stroke-width="1" fill="#444444" cx="20" cy="17" r="1" />
</svg>`);
  });

  it('should handle nested transforms', () => {
    const cleaned = clean(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 43.1 (39012) - http://www.bohemiancoding.com/sketch -->
    <title>red</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linejoin="round">
        <g id="red" stroke="#FD245C" stroke-width="2">
            <g id="Red-Icon" transform="translate(2.000000, 2.000000)">
                <circle id="Oval" fill="#FFFFFF" stroke-linecap="square" cx="18" cy="18" r="18"></circle>
                <path d="M13,13 L23,23" id="Path-4" stroke-linecap="round"></path>
                <path d="M13,13 L23,23" id="Path-4" stroke-linecap="round" transform="translate(18.000000, 18.000000) rotate(-90.000000) translate(-18.000000, -18.000000) "></path>
            </g>
        </g>
    </g>
</svg>`);
    expect(cleaned).to
      .equal(`<svg width="40px" height="40px" viewBox="0 0 40 40" stroke="#FD245C" stroke-width="2" fill-rule="evenodd" stroke-linejoin="round" fill="none" stroke-linecap="round">
  <circle fill="#FFFFFF" stroke-linecap="square" cx="20" cy="20" r="18" />
  <path d="M15,15 L25,25" />
  <path d="M15,25 L25,15" />
</svg>`);
  });

  xit('should handle rotated rectangles', () => {
    const cleaned = clean(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="60px" height="60px" viewBox="0 0 60 60" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 43.1 (39012) - http://www.bohemiancoding.com/sketch -->
    <title>search</title>
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="search">
            <circle id="Oval" fill="#CFE9FF" cx="34.5" cy="27.5" r="13.5"></circle>
            <circle id="Oval" fill="#FFFFFF" cx="32.5" cy="25.5" r="11.5"></circle>
            <path d="M17.0892857,29 L3.08928571,29" id="Line" stroke="#FFEFC6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M20.0428571,39 L6.1,39" id="Line" stroke="#FFD0D8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M20,18 L6,18" id="Line" stroke="#D0FDC2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M44,38 L53.5,47.5" id="Line" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <rect id="Rectangle" stroke="#444444" stroke-width="2" fill="#9FC3FF" stroke-linecap="round" stroke-linejoin="round" transform="translate(52.707107, 46.707107) rotate(-45.000000) translate(-52.707107, -46.707107) " x="50.7071068" y="39.2218254" width="4" height="14.9705627" rx="2"></rect>
            <path d="M16,27.0285714 L2,27.0285714" id="Line" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M18.9535714,37 L5.01071429,37" id="Line" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M18.9535714,16 L5.01071429,16" id="Line" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <circle id="Oval" stroke="#444444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" cx="34.5" cy="27.5" r="13.5"></circle>
        </g>
    </g>
</svg>`);
    expect(cleaned).to
      .equal(`<svg width="60px" height="60px" viewBox="0 0 60 60" fill-rule="evenodd" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke="#444444">
  <circle stroke="none" stroke-width="1" fill="#CFE9FF" cx="34.5" cy="27.5" r="13.5" />
  <circle stroke="none" stroke-width="1" fill="#FFFFFF" cx="32.5" cy="25.5" r="11.5" />
  <path stroke="#FFEFC6" d="M17.0892857,29 L3.08928571,29" />
  <path stroke="#FFD0D8" d="M20.0428571,39 L6.1,39" />
  <path stroke="#D0FDC2" d="M20,18 L6,18" />
  <path d="M44,38 L53.5,47.5" />
  <rect fill="#9FC3FF" transform="rotate(-45.000000, 52.707107, 46.707107)" x="50.7071068" y="39.2218254" width="4" height="14.9705627" rx="2" />
  <path d="M16,27.0285714 L2,27.0285714" />
  <path d="M18.9535714,37 L5.01071429,37" />
  <path d="M18.9535714,16 L5.01071429,16" />
  <circle cx="34.5" cy="27.5" r="13.5" />
</svg>`);
  });
});

describe('Clean into React/JSX', () => {
  it('should clean a simple icon into JSX', () => {
    const cleaned = cleanJSX(
      `<svg width="15px" height="15px" viewBox="0 0 15 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 43.1 (39012) - http://www.bohemiancoding.com/sketch -->
    <desc>Created with Sketch.</desc>
    <defs></defs>
    <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="Forums" transform="translate(-2.000000, -3.000000)" stroke="#000000">
            <path d="M6.5,3.5 L16.5,3.5 L16.5,11.5 L15.5,11.5 L15.5,14.5 L12.5,11.5 L6.5,11.5 L6.5,3.5 Z" id="Rectangle-5"></path>
            <path d="M11.5,13 L11.5,14.5 L6.5,14.5 L3.5,17.5 L3.5,14.5 L2.5,14.5 L2.5,6.5 L5,6.5" id="Rectangle-5"></path>
            <path d="M12.5,5.5 L14.5,5.5" id="Line"></path>
            <path d="M8.5,7.5 L12.5,7.5" id="Line"></path>
            <path d="M14.5,7.5 L14.5,7.5" id="Line"></path>
            <path d="M8.5,5.5 L10.5,5.5" id="Line"></path>
            <path d="M14.5,9.5 L11.5,9.5" id="Line"></path>
            <path d="M8.5,9.5 L9.5,9.5" id="Line"></path>
        </g>
    </g>
  <rect x="0" y="0" width="10" height="10" transform="translate(10, 10)" />
</svg>`,
      'View',
      {component: 'svg'},
      ['stroke'],
      ['props'],
    );
    expect(cleaned).to
      .equal(`<View width={15} height={15} viewBox="0 0 15 15" stroke={stroke} strokeWidth={1} fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round" component="svg" {...props}>
  <path d="M4.5,0.5 L14.5,0.5 L14.5,8.5 L13.5,8.5 L13.5,11.5 L10.5,8.5 L4.5,8.5 L4.5,0.5 Z" />
  <path d="M9.5,10 L9.5,11.5 L4.5,11.5 L1.5,14.5 L1.5,11.5 L0.5,11.5 L0.5,3.5 L3,3.5" />
  <path d="M10.5,2.5 L12.5,2.5" />
  <path d="M6.5,4.5 L10.5,4.5" />
  <path d="M12.5,4.5 L12.5,4.5" />
  <path d="M6.5,2.5 L8.5,2.5" />
  <path d="M12.5,6.5 L9.5,6.5" />
  <path d="M6.5,6.5 L7.5,6.5" />
  <rect x={10} y={10} width={10} height={10} />
</View>`);
  });
});
