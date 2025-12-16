import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import { dts } from 'rollup-plugin-dts';
import preserveDirectives from 'rollup-plugin-preserve-directives';
import tsPaths from 'rollup-plugin-tsconfig-paths';
import packageJson from './package.json' assert { type: 'json' };
import scss from 'rollup-plugin-scss';
import tsBuildConfig from './tsconfig.json' assert { type: 'json' };

// suppresses warnings printed to console as part of bundling components with directives present.
const onWarnSuppression = {
  onwarn(warning, warn) {
    if (
      warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
      warning.message.includes(`"use client"`)
    ) {
      return;
    }
    warn(warning);
  },
};

const commonPlugins = [external(), tsPaths(), resolve(), commonjs()];

export default [
  // cjs export
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      ...commonPlugins,
      scss({ fileName: 'bundle.css',
        includePaths: ['node_modules'] 
       }),
      typescript({
        compilerOptions: {
          declaration: false,
        },
      }),
      terser(),
    ],
    ...onWarnSuppression,
  },
  // esm export
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist/esm',
        format: 'esm',
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [
      ...commonPlugins,
      scss({ fileName: 'bundle.css' }),
      typescript({
        compilerOptions: {
          declaration: true,
          declarationDir: 'dist/esm',
          emitDeclarationOnly: true,
          outDir: 'dist/esm',
        },
      }),
      preserveDirectives(),
      terser({ compress: { directives: false } }),
    ],
    ...onWarnSuppression,
  },
  // type bundling
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    external: [/\.css$/, /\.scss$/],
    plugins: [
      dts({
        compilerOptions: {
          paths: tsBuildConfig.compilerOptions.paths,
        },
      }),
    ],
  },
];
