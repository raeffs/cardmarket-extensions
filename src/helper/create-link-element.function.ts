import { RequestParams } from '../models/request-params';

export function createLinkElement(
  name: string,
  baseUrl: string,
  params: RequestParams
): HTMLAnchorElement {
  const withQuery = `${baseUrl}?${params.asString()}`;
  const element = document.createElement('a');
  element.href = withQuery;
  element.text = name;
  return element;
}
