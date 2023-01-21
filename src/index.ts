import { decorateOffersSingles } from './page-decorators/decorate-offers-singles.function';
import { decorateSingles, decorateSingles2 } from './page-decorators/decorate-singles.function';
import { decorateUser } from './page-decorators/decorate-user.function';

async function main(): Promise<void> {
  var match = window.location.href.match(/\/\/www\.cardmarket\.com\/(?<lang>\w+)\//);
  if (match && match.groups && match.groups['lang'] != 'en') {
    window.location.href = window.location.href.replace(
      `//www.cardmarket.com/${match.groups['lang']}/`,
      '//www.cardmarket.com/en/'
    );
  }

  if (window.location.pathname.match(/\/Magic\/Users\/[^\/]*($|\?)/)) {
    await decorateUser();
  }

  if (window.location.pathname.match(/\/Magic\/Users\/\S*\/Offers\/Singles/)) {
    await decorateOffersSingles();
  }

  if (window.location.pathname.match(/\/Magic\/Products\/Singles/)) {
    await decorateSingles();
  }

  if (window.location.pathname.match(/\/Magic\/Cards/)) {
    await decorateSingles2();
  }
}

main().catch(error => console.error(error));
