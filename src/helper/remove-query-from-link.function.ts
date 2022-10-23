export function removeQueryFromLink(link: string): string {
  return link.split('?')[0];
}
