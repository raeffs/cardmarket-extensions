import { getChildByClass } from '../helper/get-child-by-class.function';
import { getChildrenByTag } from '../helper/get-childred-by-tag.function';
import { getChildrenByClass } from '../helper/get-children-by-class.function';
import { removeQueryFromLink } from '../helper/remove-query-from-link.function';

declare interface GlobalFunctions {
  setValue(name: string, value: string): Promise<void>;
  getValue(name: string): Promise<string | undefined>;
  getValue(name: string, defaultValue: string): Promise<string>;
}

declare const GM: GlobalFunctions;

export async function decorateSingles(): Promise<void> {
  const infoList = getChildByClass(document, 'info-list-container');
  for (const link of getChildrenByTag<HTMLAnchorElement>(infoList, 'a')) {
    const currentQuery = window.location.href.split('?')[1] || '';
    link.href = `${removeQueryFromLink(link.href)}?${currentQuery}`;
  }

  const favouriteUsers = await getFavorites();
  for (const row of getChildrenByClass(document, 'article-row')) {
    const seller = getChildByClass(row, 'seller-name');
    const sellerName = seller.textContent ?? '';
    const isFav = favouriteUsers.includes(sellerName);
    if (isFav) {
      (row as HTMLElement).style.backgroundColor = 'khaki';
    }
  }
}

async function getFavorites(): Promise<string[]> {
  return JSON.parse((await GM.getValue('FavoriteUsers')) ?? '[]');
}

export async function decorateSingles2(): Promise<void> {
  const favouriteUsers = await getFavorites();
  for (const row of getChildrenByClass(document, 'article-row')) {
    const seller = getChildByClass(row, 'seller-name');
    const sellerName = seller.textContent ?? '';
    const isFav = favouriteUsers.includes(sellerName);
    if (isFav) {
      (row as HTMLElement).style.backgroundColor = 'khaki';
    }
  }
}
