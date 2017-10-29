Vectorinox
==========

Cleans up and compresses SVG files exported from Sketch (and other design tools). Work-in-progress.

How to use
---------

A better UI will come in the future. In the meantime you can run it like this:

```shell
> npm install
> ./node_modules/.bin/ts-node src/bin.ts vector-file-to-optimize.svg
```

This will optimize the SVG file in place.

React/JSX
---------

To prep and format SVG for inlining in your React codebase, use the `--jsx` option (`--stdout` prints the result instead of modifying the file in place).

```shell
> ./node_modules/.bin/ts-node src/bin.ts --jsx --stdout vector-file-to-optimize.svg
```
```svg
<svg stroke="#444444" strokeWidth={2} fill="none">
  <rect x={8} y={3} width={32} height={41} rx={3} />
  <circle fill="#CFE9FF" cx={15} cy={10} r={3} />
  <path d="M22.4375,10 L35.5625,10" />
</svg>
```

You can pipe the output to `pbcopy` (Mac) or `clip` (Windows) for easy pasting into your code:

```shell
> ./node_modules/.bin/ts-node src/bin.ts --jsx --stdout vector-file-to-optimize.svg | pbcopy
```

You can customize the root tag and props assigned to it. For example, if you use [JSXStyle](https://github.com/smyte/jsxstyle), you can output `<View component="svg" />` instead of `<svg />`:

```shell
> ./node_modules/.bin/ts-node src/bin.ts --jsx --stdout vector-file-to-optimize.svg --jsxTag View --jsxProp component=svg
```
```svg
<View stroke="#444444" strokeWidth={2} fill="none" component="svg">
  <rect x="#CFE9FF" cx="M22.4375,10 L35.5625,10" />
  <circle cx="M22.4375,19 L35.5625,19" />
</View>
```

You can even specify which props to pass through from the parent:

```shell
> ./node_modules/.bin/ts-node src/bin.ts --jsx --stdout vector-file-to-optimize.svg --jsxTag View --jsxProp component=svg --jsxInheritProp stroke --jsxInheritProp fill
```
```svg
<View stroke="#444444" strokeWidth={2} fill="none" component="svg" stroke={stroke} fill={fill}>
  <rect x="#CFE9FF" cx="M22.4375,10 L35.5625,10" />
  <circle cx="M22.4375,19 L35.5625,19" />
</View>
```

Or which props object to splice in:
```shell
> ./node_modules/.bin/ts-node src/bin.ts --jsx --stdout vector-file-to-optimize.svg --jsxTag View --jsxProp component=svg --jsxSpliceProp props
```
```svg
<View component="svg" {...props}>
  <rect x="#CFE9FF" cx="M22.4375,10 L35.5625,10" />
  <circle cx="M22.4375,19 L35.5625,19" />
</View>
```