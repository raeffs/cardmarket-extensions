export function getChildrenByClass(
  parent: Element | Document,
  className: string
): HTMLCollectionOf<Element> {
  return parent.getElementsByClassName(className);
}
