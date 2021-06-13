import preprocess from 'svelte-preprocess';
import node from '@sveltejs/adapter-node';
// import pkg from './package.json';

// const preprocess = require('svelte-preprocess');
// const node = require('@sveltejs/adapter-node');
/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: node({
			out: 'build'
		}),
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		vite: {
			ssr: {
				noExternal: ['@benzene/http']
			}
		}
	}
};

export default config;
