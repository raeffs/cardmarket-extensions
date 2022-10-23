const builder = require('esbuild');

function getHeader(version) {
  return `
// ==UserScript==
// @name         Cardmarket Extensions Dev
// @version      ${version}
// @match        https://www.cardmarket.com/*
// @downloadURL  http://localhost:3000/cardmarket.extensions.user.js
// @updateURL    http://localhost:3000/cardmarket.extensions.user.js
// @grant        none
// ==/UserScript==
    `;
}

function build() {
  version = new Date().valueOf();
  console.log('building version', version);
  const header = getHeader(version);
  let currentResult;
  builder
    .build({
      entryPoints: ['src/index.ts'],
      bundle: true,
      outfile: 'dist/cardmarket.extensions.user.js',
      banner: {
        js: header,
      },
      watch: {
        onRebuild(error, result) {
          console.log('rebuilding...');
          currentResult.stop();
          build();
        },
      },
    })
    .then(result => {
      currentResult = result;
    })
    .catch(() => {
      console.log('restarting...');
      setTimeout(() => {
        build();
      }, 1000);
    });
}

build();
