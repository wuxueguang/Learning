
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
// import { terser } from 'rollup-plugin-terser';
// import nodePolyfills from 'rollup-plugin-node-polyfills';
import builtins from 'rollup-plugin-node-builtins';

import babel from '@rollup/plugin-babel';
// import less from 'rollup-plugin-less';
// import sass from 'rollup-plugin-sass';
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss';


export default [{
  input: 'src/main.js',
  output: {
    name: 'bundle.js',
    file: 'src/bundle.js',
    format: 'umd',
  },
  plugins: [
    postcss({
      modules: true,
      extensions: ['.css', '.less', '.scss'],
    }),
    alias({
      entries: [
        { find: /^@\/(.*)/, replacement: `${__dirname}/src/$1` }
      ],
    }),
    resolve({
      preferBuiltins: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    babel({
      babelrc: true,
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    commonjs(),   // must be after babel
    builtins(),
    // less(),
    // terser(),
    // sass(),
    json(),
  ],
  
}];