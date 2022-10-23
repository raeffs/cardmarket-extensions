import { getChildByClass } from '../helper/get-child-by-class.function';
import { getChildrenByTag } from '../helper/get-childred-by-tag.function';
import { removeQueryFromLink } from '../helper/remove-query-from-link.function';

export function decorateSingles(): void {
  const infoList = getChildByClass(document, 'info-list-container');
  for (const link of getChildrenByTag<HTMLAnchorElement>(infoList, 'a')) {
    const currentQuery = window.location.href.split('?')[1] || '';
    link.href = `${removeQueryFromLink(link.href)}?${currentQuery}`;
  }
}
