#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import {clean, cleanJSX} from './index';

const DEFAULT_JSX_TEMPLATE = `import * as React from 'react';

const %NAME% = (%PROPS%) =>
  %SVG%;

export default %NAME%;
`;

const options = {
  jsx: false,
  stdout: false,
  jsxTag: 'svg',
  jsxExtension: 'js',
  jsxProps: {} as {[name: string]: string},
  jsxInheritProps: [] as string[],
  jsxSpliceProps: [] as string[],
  jsxTemplate: '.svgTemplate.js',
};

let nextOption: keyof typeof options | null = null;
const files = process.argv.slice(2).filter(arg => {
  if (nextOption) {
    if (nextOption === 'jsxProps') {
      const [name, value] = arg.split('=');
      options.jsxProps[name] = value;
    } else if (nextOption === 'jsxInheritProps') {
      options.jsxInheritProps.push(arg);
    } else if (nextOption == 'jsxSpliceProps') {
      options.jsxSpliceProps.push(arg);
    } else if (nextOption == 'jsxExtension') {
      options.jsxExtension = arg;
    } else {
      options[nextOption] = arg;
    }
    nextOption = null;
    return false;
  }
  if (arg === '--jsx') {
    options.jsx = true;
    return false;
  }
  if (arg === '--stdout') {
    options.stdout = true;
    return false;
  }
  if (arg === '--jsxTag') {
    nextOption = 'jsxTag';
    return false;
  }
  if (arg === '--jsxProp') {
    nextOption = 'jsxProps';
    return false;
  }
  if (arg === '--jsxInheritProp') {
    nextOption = 'jsxInheritProps';
    return false;
  }
  if (arg === '--jsxSpliceProp') {
    nextOption = 'jsxSpliceProps';
    return false;
  }
  if (arg === '--jsxExtension') {
    nextOption = 'jsxExtension';
    return false;
  }
  return true;
});

function indent(s: string, prefix: string) {
  return s.split('\n').join(`\n${prefix}`);
}

function wrapJSX(pathName: string, cleaned: string, template: string) {
  const name = path
    .basename(pathName, path.extname(pathName))
    .replace(/(^|-)([a-z])/g, (_, _1, c) => c.toUpperCase());
  const propsDefinition = [...options.jsxInheritProps, ...options.jsxSpliceProps.map(p => `...${p}`)].join(
    ', ',
  );
  return template
    .replace(/%NAME%/g, name)
    .replace(/%PROPS%/g, `{${propsDefinition}}`)
    .replace(
      /(\n([ \t]*))?%SVG%/g,
      (_, before, whitespace) => (before || '') + indent(cleaned, whitespace || '  '),
    );
}

for (let f of files) {
  const data = fs.readFileSync(f).toString();
  let cleaned = options.jsx
    ? cleanJSX(data, options.jsxTag, options.jsxProps, options.jsxInheritProps, options.jsxSpliceProps)
    : clean(data);

  if (options.jsx) {
    const template = fs.existsSync(options.jsxTemplate)
      ? fs.readFileSync(options.jsxTemplate).toString()
      : DEFAULT_JSX_TEMPLATE;
    cleaned = wrapJSX(f, cleaned, template);
  }

  if (options.stdout) {
    console.log(cleaned);
  } else {
    if (options.jsx) {
      const sourceName = f;
      f = f.replace(/\.svg$/, `.${options.jsxExtension}`);
      console.error(`${sourceName} -> ${f}`);
    } else {
      console.error(f);
    }

    fs.writeFileSync(f, cleaned);
  }
}
