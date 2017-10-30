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
      .equal(`<svg width="48px" height="48px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" stroke="#444444" stroke-width="2" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round" fill="none">
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
      .equal(`<svg width="40px" height="40px" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" stroke="#FD245C" stroke-width="2" fill-rule="evenodd" stroke-linejoin="round" fill="none" stroke-linecap="round">
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

describe('Cleans up Sketch centered stroke hack', () => {
  xit('should fix stroke on a rounded rectangle', () => {
    const cleaned = clean(
      `<?xml version="1.0" encoding="UTF-8"?>
      <svg width="44px" height="48px" viewBox="0 0 44 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch -->
          <title>icons/checklist</title>
          <desc>Created with Sketch.</desc>
          <defs>
              <rect id="path-1" x="0" y="0" width="36" height="40" rx="4"></rect>
              <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="36" height="40" fill="white">
                  <use xlink:href="#path-1"></use>
              </mask>
          </defs>
          <g id="assets" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Icons" transform="translate(-127.000000, -1054.000000)">
                  <g id="icons/checklist" transform="translate(127.000000, 1054.000000)">
                      <use id="Rectangle" stroke="#1F223B" mask="url(#mask-2)" stroke-width="4" fill="#FFFFFF" xlink:href="#path-1"></use>
                      <g id="Group-3" transform="translate(5.000000, 5.000000)">
                          <rect id="Rectangle-3" fill="#F8F8F9" x="0" y="0" width="26" height="5" rx="1"></rect>
                          <rect id="Rectangle-3-Copy" fill="#9EA1AE" x="2" y="11" width="13" height="1" rx="0.5"></rect>
                          <path d="M20.7195069,13.2804283 C21.0124038,13.573361 21.487317,13.5733755 21.7802318,13.2804607 L24.7803234,10.2803692 C25.0732255,9.987467 25.0732255,9.51257876 24.7803234,9.2196766 C24.4874212,8.92677447 24.012533,8.92677447 23.7196308,9.2196766 L21.2586491,11.6981218 L20.2804015,10.7197548 C19.9875173,10.4268347 19.512629,10.4268057 19.219709,10.71969 C18.926789,11.0125743 18.92676,11.4874625 19.2196442,11.7803825 L20.7195069,13.2804283 Z" id="Combined-Shape-path-Copy" fill="#1F223B"></path>
                          <rect id="Rectangle-3-Copy-2" fill="#9EA1AE" x="2" y="19" width="13" height="1" rx="0.5"></rect>
                          <path d="M20.7195069,21.2804283 C21.0124038,21.573361 21.487317,21.5733755 21.7802318,21.2804607 L24.7803234,18.2803692 C25.0732255,17.987467 25.0732255,17.5125788 24.7803234,17.2196766 C24.4874212,16.9267745 24.012533,16.9267745 23.7196308,17.2196766 L21.2586491,19.6981218 L20.2804015,18.7197548 C19.9875173,18.4268347 19.512629,18.4268057 19.219709,18.71969 C18.926789,19.0125743 18.92676,19.4874625 19.2196442,19.7803825 L20.7195069,21.2804283 Z" id="Combined-Shape-path-Copy-2" fill="#1F223B"></path>
                          <rect id="Rectangle-3-Copy-3" fill="#9EA1AE" x="2" y="27" width="13" height="1" rx="0.5"></rect>
                          <path d="M20.7195069,29.2804283 C21.0124038,29.573361 21.487317,29.5733755 21.7802318,29.2804607 L24.7803234,26.2803692 C25.0732255,25.987467 25.0732255,25.5125788 24.7803234,25.2196766 C24.4874212,24.9267745 24.012533,24.9267745 23.7196308,25.2196766 L21.2586491,27.6981218 L20.2804015,26.7197548 C19.9875173,26.4268347 19.512629,26.4268057 19.219709,26.71969 C18.926789,27.0125743 18.92676,27.4874625 19.2196442,27.7803825 L20.7195069,29.2804283 Z" id="Combined-Shape-path-Copy-3" fill="#6575CE"></path>
                      </g>
                      <g id="Group-9" transform="translate(20.000000, 24.000000)">
                          <circle id="Oval-2" fill="#6575CE" cx="12" cy="12" r="12"></circle>
                          <path d="M9.29267588,16.7072378 C9.6832051,17.0978147 10.3164227,17.097834 10.7069758,16.707281 L17.7070979,9.70715889 C18.097634,9.31662267 18.097634,8.68343835 17.7070979,8.29290213 C17.3165617,7.90236596 16.6833773,7.90236596 16.2928411,8.29290213 L10.0115322,14.5974957 L7.70720206,12.2930064 C7.31668969,11.9024463 6.68350537,11.9024076 6.2929453,12.29292 C5.90238528,12.6834324 5.90234663,13.3166167 6.292859,13.7071767 L9.29267588,16.7072378 Z" id="Combined-Shape-path-Copy-3" fill="#F8F8F9"></path>
                      </g>
                  </g>
              </g>
          </g>
      </svg>`,
    );
    expect(cleaned).to
      .equal(`<svg width="44px" height="48px" viewBox="0 0 44 48" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke="none" stroke-width="1">
  <rect stroke="#1F223B" stroke-width="2" fill="#FFFFFF" x="1" y="1" width="34" height="38" rx="4" />
  <rect fill="#F8F8F9" x="5" y="5" width="26" height="5" rx="1" />
  <rect fill="#9EA1AE" x="7" y="16" width="13" height="1" rx="0.5" />
  <path fill="#1F223B" d="M25.72,18.28 C26.012,18.573 26.487,18.573 26.78,18.28 L29.78,15.28 C30.073,14.987 30.073,14.513 29.78,14.22 C29.487,13.927 29.013,13.927 28.72,14.22 L26.259,16.698 L25.28,15.72 C24.988,15.427 24.513,15.427 24.22,15.72 C23.927,16.013 23.927,16.487 24.22,16.78 L25.72,18.28 Z" />
  <rect fill="#9EA1AE" x="7" y="24" width="13" height="1" rx="0.5" />
  <path fill="#1F223B" d="M25.72,26.28 C26.012,26.573 26.487,26.573 26.78,26.28 L29.78,23.28 C30.073,22.987 30.073,22.513 29.78,22.22 C29.487,21.927 29.013,21.927 28.72,22.22 L26.259,24.698 L25.28,23.72 C24.988,23.427 24.513,23.427 24.22,23.72 C23.927,24.013 23.927,24.487 24.22,24.78 L25.72,26.28 Z" />
  <rect fill="#9EA1AE" x="7" y="32" width="13" height="1" rx="0.5" />
  <path fill="#6575CE" d="M25.72,34.28 C26.012,34.573 26.487,34.573 26.78,34.28 L29.78,31.28 C30.073,30.987 30.073,30.513 29.78,30.22 C29.487,29.927 29.013,29.927 28.72,30.22 L26.259,32.698 L25.28,31.72 C24.988,31.427 24.513,31.427 24.22,31.72 C23.927,32.013 23.927,32.487 24.22,32.78 L25.72,34.28 Z" />
  <circle fill="#6575CE" cx="32" cy="36" r="12" />
  <path fill="#F8F8F9" d="M29.293,40.707 C29.683,41.098 30.316,41.098 30.707,40.707 L37.707,33.707 C38.098,33.317 38.098,32.683 37.707,32.293 C37.317,31.902 36.683,31.902 36.293,32.293 L30.012,38.597 L27.707,36.293 C27.317,35.902 26.684,35.902 26.293,36.293 C25.902,36.683 25.902,37.317 26.293,37.707 L29.293,40.707 Z" />
</svg>`);
  });
});
