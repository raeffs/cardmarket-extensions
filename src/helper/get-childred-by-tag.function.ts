export function getChildrenByTag<T extends Element = Element>(
  parent: Element | Document,
  className: string
): HTMLCollectionOf<T> {
  return parent.getElementsByTagName(className) as HTMLCollectionOf<T>;
}
