#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';
import {clean, cleanJSX} from './index';

const DEFAULT_JSX_TEMPLATE = `import * as React from 'react';

const %NAME% = (%PROPS%) =>
  %SVG%;

export default %NAME%;
`;

const options = (yargs
  .usage('$0 [options] svgfile ... svgfile')
  .option('stdout', {
    group: 'Output:',
    type: 'boolean',
    default: false,
    alias: 'o',
    describe: 'Print results to stdout instead of writing to file',
  })
  .option('jsx', {
    group: 'JSX Options:',
    type: 'boolean',
    default: false,
    describe: 'Convert to JSX',
  })
  .option('jsx-extension', {
    group: 'JSX Options:',
    default: 'js',
    describe: 'File extension to use when converting to JSX (ignored with --stdout)',
  })
  .option('jsx-tag', {
    group: 'JSX Options:',
    default: 'svg',
    describe: 'The name of the top level tag to use when converting to JSX',
  })
  .option('jsx-prop', {
    group: 'JSX Options:',
    default: [],
    describe:
      'Add a prop and value to add to the top level tag, in the format prop=value (can be used multiple times)',
    coerce: toDict,
  })
  .option('jsx-inherit-prop', {
    group: 'JSX Options:',
    default: [],
    describe: 'A prop name to pass through to the root tag, i.e. prop={prop} (can be used multiple times)',
    coerce: toArray,
  })
  .option('jsx-splice-prop', {
    group: 'JSX Options:',
    default: [],
    describe: 'A prop name to splice into the root tag, i.e. {...prop} (can be used multiple times)',
    coerce: toArray,
  })
  .option('jsx-template', {
    group: 'JSX Options:',
    default: '.svgTemplate.js',
    describe: 'A file containing the template to use when converting to a JSX component',
  })
  .example('$0 image.svg', 'Optimize an image in place')
  .example('$0 --stdout image.svg | pbcopy', 'Optimize an image and copy the SVG code to the clipboard')
  .example(
    '$0 --jsx image.svg',
    'Optimize a file and convert it to a React module with a .js extension using the default template',
  )
  .example(
    '$0 --jsx image.svg --jsx-template mySvgTemplate.js',
    'Optimize a file and convert it to a React module with a .js extension using the provided template',
  )
  .example(
    '$0 --jsx --jsx-extension tsx image.svg',
    'Optimize a file and convert it to a React module with a .tsx extension',
  )
  .strict()
  .wrap(Math.min(120, yargs.terminalWidth() - 2))
  .help().argv as object) as {
  jsx: boolean;
  stdout: boolean;
  jsxTag: string;
  jsxExtension: string;
  jsxProp: {[name: string]: string};
  jsxInheritProp: string[];
  jsxSpliceProp: string[];
  jsxTemplate: string;
  _: string[];
};

function indent(s: string, prefix: string) {
  return s.split('\n').join(`\n${prefix}`);
}

function wrapJSX(pathName: string, cleaned: string, template: string) {
  const name = path
    .basename(pathName, path.extname(pathName))
    .replace(/(^|-)([a-z])/g, (_, _1, c) => c.toUpperCase());
  const propsDefinition = [...options.jsxInheritProp, ...options.jsxSpliceProp.map(p => `...${p}`)].join(
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

function toDict(options: string[] | string): {[name: string]: string} {
  if (typeof options === 'string') options = [options];
  return options.map(s => s.split('=')).reduce((obj: {[name: string]: string}, [k, v]) => {
    obj[k] = v;
    return obj;
  }, {});
}

function toArray(options: string[] | string): string[] {
  return typeof options === 'string' ? [options] : options;
}

for (let f of options._) {
  const data = fs.readFileSync(f).toString();
  let cleaned = options.jsx
    ? cleanJSX(data, options.jsxTag, options.jsxProp, options.jsxInheritProp, options.jsxSpliceProp)
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
