import { build } from 'esbuild'
import { globPlugin } from 'esbuild-plugin-glob'

const watch = process.argv.indexOf('--watch') >= 0
const minify = process.argv.indexOf('--no-minify') < 0

await build({
    // bundling
    format: 'esm',
    bundle: true,
    splitting: true,
    minify: !watch && minify,

    // in / out
    entryPoints: [
        `blocks/**/*.jsx`
    ],
    entryNames: '[dir]/[name]',
    outdir: '.',
    outbase: '.',

    // jsx support
    jsx: 'automatic',
    jsxImportSource: '@buuhuu/jsx-runtime',

    // plugins
    plugins: [
        globPlugin(),
        {
            name: 'handle-script-includes',
            setup: build => build.onResolve(
                { filter: /.\/scripts\// }, 
                ({ path }) => ({ path, external: true, namespace: '' }))
        }
    ],

    // dev
    watch
})