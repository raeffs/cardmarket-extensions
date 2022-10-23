export function getChildByTag<T extends Element = Element>(
  parent: Element | Document,
  className: string
): T {
  return parent.getElementsByTagName(className)[0] as T;
}
