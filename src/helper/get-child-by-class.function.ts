export function getChildByClass(
  parent: Element | Document,
  className: string
): Element {
  return parent.getElementsByClassName(className)[0];
}
