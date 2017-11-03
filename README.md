Vectorinox
==========

Cleans up and compresses SVG files exported from Sketch (and other design tools). Optionally formats SVG as JSX for inlining into React projects.

Install
-------

```bash
> npm install -g vectorinox
```

Example Usage
--------------

To optimize an SVG file in place:

```bash
> vectorinox vector-file-to-optimize.svg
```

To output the optimized SVG to stdout:

```bash
> vectorinox --stdout vector-file-to-optimize.svg
```

Full Usage
----------
```
vectorinox [options] svgfile ... svgfile

Output:
  --stdout, -o  Print results to stdout instead of writing to file                   [boolean] [default: false]

JSX Options:
  --jsx               Convert to JSX                                                 [boolean] [default: false]
  --jsx-extension     File extension to use when converting to JSX (ignored with --stdout)      [default: "js"]
  --jsx-tag           The name of the top level tag to use when converting to JSX              [default: "svg"]
  --jsx-prop          Add a prop and value to add to the top level tag, in the format prop=value (can be used
                      multiple times)                                                             [default: []]
  --jsx-inherit-prop  A prop name to pass through to the root tag, i.e. prop={prop} (can be used multiple
                      times)                                                                      [default: []]
  --jsx-splice-prop   A prop name to splice into the root tag, i.e. {...prop} (can be used multiple times)
                                                                                                  [default: []]
  --jsx-template      A file containing the template to use when converting to a JSX component
                                                                                   [default: ".svgTemplate.js"]

Options:
  --version  Show version number                                                                      [boolean]
  --help     Show help                                                                                [boolean]

Examples:
  vectorinox image.svg                                     Optimize an image in place
  vectorinox --stdout image.svg | pbcopy                   Optimize an image and copy the SVG code to the
                                                           clipboard
  vectorinox --jsx image.svg                               Optimize a file and convert it to a React module
                                                           with a .js extension using the default template
  vectorinox --jsx image.svg --jsx-template                Optimize a file and convert it to a React module
  mySvgTemplate.js                                         with a .js extension using the provided template
  vectorinox --jsx --jsx-extension tsx image.svg           Optimize a file and convert it to a React module
                                                           with a .tsx extension
```

React/JSX
---------

To prep and format SVG for inlining in your React codebase, use the `--jsx` option.

```bash
> vectorinox --jsx --stdout vector-file-to-optimize.svg
```
```xml
<svg stroke="#444444" strokeWidth={2} fill="none">
  <rect x={8} y={3} width={32} height={41} rx={3} />
  <circle fill="#CFE9FF" cx={15} cy={10} r={3} />
  <path d="M22.4375,10 L35.5625,10" />
</svg>
```

You can pipe the output to `pbcopy` (Mac) or `clip` (Windows) for easy pasting into your code:

```bash
> vectorinox --jsx --stdout vector-file-to-optimize.svg | pbcopy
```

You can customize the root tag and props assigned to it. For example, if you use [JSXStyle](https://github.com/smyte/jsxstyle), you can output `<View component="svg" />` instead of `<svg />`:

```bash
> vectorinox --jsx --stdout vector-file-to-optimize.svg --jsxTag View --jsxProp component=svg
```
```xml
<View stroke="#444444" strokeWidth={2} fill="none" component="svg">
  <rect x="#CFE9FF" cx="M22.4375,10 L35.5625,10" />
  <circle cx="M22.4375,19 L35.5625,19" />
</View>
```

You can even specify which props to pass through from the parent:

```bash
> vectorinox --jsx --stdout vector-file-to-optimize.svg --jsxTag View --jsxProp component=svg --jsxInheritProp stroke --jsxInheritProp fill
```
```xml
<View stroke={stroke} strokeWidth={2} fill={fill} component="svg">
  <rect x="#CFE9FF" cx="M22.4375,10 L35.5625,10" />
  <circle cx="M22.4375,19 L35.5625,19" />
</View>
```

Or which props object to splice in:
```bash
> vectorinox --jsx --stdout vector-file-to-optimize.svg --jsxTag View --jsxProp component=svg --jsxSpliceProp props
```
```xml
<View component="svg" {...props}>
  <rect x="#CFE9FF" cx="M22.4375,10 L35.5625,10" />
  <circle cx="M22.4375,19 L35.5625,19" />
</View>
```

If you use the `--jsx` option without `--stdout`, a `.js` file with the same name as the `.svg` file will be created. To customize the extension used, use `--jsxExtension tsx`.

React Component Templates
-------------------------

It usually takes a small amount of boilerplate to convert an SVG image to a valid React component. Vectorinox comes with a default template used when converting to JSX. It looks like this:

```js
import * as React from 'react';

const %NAME% = (%PROPS%) =>
  %SVG%;

export default %NAME%;
```

You can customize the template by providing a `--jsxTemplate template.js` option, or by creating a file called `.svgTemplate.js` in the current directory.

Available placeholders are:

- `%NAME%`: a CamelCased version of the SVG file name.
- `%PROPS%`: an object destructuring of props, inferred from the `--jsxInheritProp` and `--jsxSpliceProp` options provided. For example, with `--jsxInheritProp color --jsxInheritProp fill --jsxSpliceProp props`, this token gets replaced with `{color, fill, ...props}`.
- `%SVG%`: the actual converted SVG markup. Put this on its own line with space in front of it to indent the code accordingly.


Known Issues
------------

Not all of SVG is currently supported. Specifically masks and transforms on paths that use arc segments are known to be broken.
