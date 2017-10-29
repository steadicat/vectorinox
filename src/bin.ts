#!/usr/bin/env node

import * as fs from 'fs';
import {clean, cleanJSX} from './index';

const options = {
  jsx: false,
  stdout: false,
  jsxTag: 'svg',
  jsxProps: {} as {[name: string]: string},
  jsxInheritProps: [] as string[],
  jsxSpliceProps: [] as string[],
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
  return true;
});

for (let f of files) {
  if (!options.stdout) console.error(f);
  const data = fs.readFileSync(f).toString();
  const cleaned = options.jsx
    ? cleanJSX(data, options.jsxTag, options.jsxProps, options.jsxInheritProps, options.jsxSpliceProps)
    : clean(data);
  if (options.stdout) {
    console.log(cleaned);
  } else {
    fs.writeFileSync(f, cleaned);
  }
}
