const builder = require('esbuild');

const version = '1.1';

function getHeader(version) {
  return `
// ==UserScript==
// @name         Cardmarket Extensions
// @version      ${version}
// @match        https://www.cardmarket.com/*
// @downloadURL  https://raw.githubusercontent.com/raeffs/cardmarket-extensions/main/dist/cardmarket.extensions.user.js
// @updateURL    https://raw.githubusercontent.com/raeffs/cardmarket-extensions/main/dist/cardmarket.extensions.user.js
// @grant        none
// ==/UserScript==
    `;
}

const header = getHeader(version);
builder
  .build({
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/cardmarket.extensions.user.js',
    banner: {
      js: header,
    },
  })
  .catch(() => process.exit(1));
