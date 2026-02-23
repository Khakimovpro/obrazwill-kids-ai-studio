/**
 * Prerender script — runs after `vite build` and `vite build --ssr`.
 *
 * Imports the SSR bundle, renders the app to an HTML string, and injects it
 * into dist/index.html so search engine bots receive fully-populated HTML
 * instead of an empty <div id="root">.
 *
 * The client-side JS still loads and hydrates normally in the browser.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const ssrBundle = resolve(root, 'dist/server/entry-server.js');

let render;
try {
  ({ render } = await import(ssrBundle));
} catch (err) {
  console.error('✗ Could not load SSR bundle:', ssrBundle);
  console.error(err);
  process.exit(1);
}

const templatePath = resolve(root, 'dist/index.html');
const template = readFileSync(templatePath, 'utf-8');

const appHtml = render();

// Inject rendered markup into the root element
const result = template.replace(
  '<div id="root"></div>',
  `<div id="root">${appHtml}</div>`
);

if (result === template) {
  console.warn('⚠ Replacement target not found — check that index.html contains <div id="root"></div>');
  process.exit(1);
}

writeFileSync(templatePath, result);
console.log('✓ Prerendering complete — dist/index.html updated');
