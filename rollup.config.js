import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { camelCase } from 'lodash'

import pkg from './package.json'

// If you want to customize the exposed package name, you can change it here.
const libraryName = ''

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(libraryName || pkg.name),
      format: 'umd',
      exports: 'auto',
      sourcemap: false
    },
    {
      file: pkg.main.replace('.js', '.min.js'),
      name: camelCase(libraryName || pkg.name),
      format: 'umd',
      exports: 'auto',
      sourcemap: false,
      plugins: [terser()]
    },
    { file: pkg.module, format: 'es', sourcemap: false }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    json(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Compile TypeScript files
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfig: 'tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          removeComments: true,
          module: 'ES6'
        }
      }
    }),
    // Resolve source maps to the original source
    sourceMaps()
  ]
}
