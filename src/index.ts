import { decorateOffersSingles } from './page-decorators/decorate-offers-singles.function';
import { decorateSingles } from './page-decorators/decorate-singles.function';

var match = window.location.href.match(/\/\/www\.cardmarket\.com\/(?<lang>\w+)\//);
if (match && match.groups && match.groups['lang'] != 'en') {
  window.location.href = window.location.href.replace(
    `//www.cardmarket.com/${match.groups['lang']}/`,
    '//www.cardmarket.com/en/'
  );
}

if (window.location.pathname.match(/\/Magic\/Users\/\S*\/Offers\/Singles/)) {
  decorateOffersSingles();
}

if (window.location.pathname.match(/\/Magic\/Products\/Singles/)) {
  decorateSingles();
}
