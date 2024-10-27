import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import dev from 'rollup-plugin-dev';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default [
	{ // front build
		input: 'src/main/webapp/svelte/front/main.ts',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'mokwon',
			file: 'src/main/resources/static/front/build/bundle.js'
		},
		plugins: [
			svelte({
				preprocess: sveltePreprocess({ sourceMap: !production }),
				compilerOptions: {
					dev: !production
				},
			}),

			css({ output: 'bundle.css' }),

			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),
			typescript({
				sourceMap: !production,
				inlineSources: !production
			}),
			!production && serve(),
			!production && livereload('public'),
			production && terser(),
			!production && dev({
				dirs: ['src/main/resources/static/front'],
				spa: 'src/main/resources/static/front/index.html',
				port: 8080,
				proxy: [{
					from: '/',
					to: 'http://localhost:8080/'
				}]
			})
		],
		watch: {
			clearScreen: false
		}
	}
	,
	/* admin 제외, 필요시 활성화
	{ // admin build
		input: 'src/main/webapp/svelte/admin/main.ts',
		output: {
			sourcemap: true,
			format: 'iife',
			name: 'mokwon',
			file: 'src/main/resources/static/admin/build/bundle.js'
		},
		plugins: [
			svelte({
				preprocess: sveltePreprocess({ sourceMap: !production }),
				compilerOptions: {
					dev: !production
				},
			}),

			css({ output: 'bundle.css' }),

			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),
			typescript({
				sourceMap: !production,
				inlineSources: !production
			}),
			!production && serve(),
			!production && livereload('public'),
			production && terser(),
			!production && dev({
				dirs: ['src/main/resources/static/admin'],
				spa: 'src/main/resources/static/admin/index.html',
				port: 8080,
				proxy: [
					{
						from: '/admin',
						to: 'http://localhost:8080/admin'
					},{
						from: '/admin/',
						to: 'http://localhost:8080/admin/'
					},{
						from: '/api/admin*',
						to: 'http://localhost:8080/admin/'
					}
				]
			})
		],
		watch: {
			clearScreen: false
		},
		external: [
			"filesize"
		]
	}
	*/
]