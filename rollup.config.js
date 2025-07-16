import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/index.js',
  onwarn(warning, warn) {
    // Suppress "use client" directive warnings from Mantine
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) {
      return
    }
    warn(warning)
  },
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js', 
      format: 'esm',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      browser: true,
      extensions: ['.js', '.jsx']
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx'],
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', { modules: false }],
        ['@babel/preset-react', { runtime: 'automatic' }]
      ]
    }),
    commonjs({
      include: /node_modules/
    }),
    postcss({
      extract: 'index.css',
      inject: false,
      minimize: true
    }),
    terser()
  ],
  external: ['react', 'react-dom', '@lucitra/react-components']
}