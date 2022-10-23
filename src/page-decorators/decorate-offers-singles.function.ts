import { getChildByClass } from '../helper/get-child-by-class.function';
import { getChildByTag } from '../helper/get-child-by-tag.function';
import { getChildrenByClass } from '../helper/get-children-by-class.function';
import { removeQueryFromLink } from '../helper/remove-query-from-link.function';
import { parseCondition } from '../models/conditions';
import { Countries } from '../models/countries';
import { Flags } from '../models/flags';
import { parseLanguage } from '../models/languages';
import { RequestParams } from '../models/request-params';

export function decorateOffersSingles(): void {
  for (const offer of getChildrenByClass(document, 'article-row')) {
    const productName = getChildByClass(offer, 'col-seller');

    const productAttributes = getChildByClass(offer, 'product-attributes');
    const condition = parseCondition(getChildByClass(productAttributes, 'article-condition').textContent);
    const language = parseLanguage(
      getChildrenByClass(productAttributes, 'icon mr-2')[1].getAttribute('data-original-title')
    );

    let isFoil = false;
    for (const element of getChildrenByClass(productAttributes, 'icon mr-1')) {
      if (element.getAttribute('data-original-title') == 'Foil') {
        isFoil = true;
        break;
      }
    }

    let requestParams = new RequestParams()
      .setCountry(Countries.Switzerland)
      .setLanguage(language)
      .setCondition(condition);

    if (isFoil) {
      requestParams = requestParams.setFoil(Flags.Yes);
    }

    const productLink = getChildByTag<HTMLAnchorElement>(productName, 'a');
    productLink.href = `${removeQueryFromLink(productLink.href)}?${requestParams.asString()}`;
  }
}
