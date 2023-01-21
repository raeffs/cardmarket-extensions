declare interface GlobalFunctions {
  setValue(name: string, value: string): Promise<void>;
  getValue(name: string): Promise<string | undefined>;
  getValue(name: string, defaultValue: string): Promise<string>;
}

declare const GM: GlobalFunctions;

export async function decorateUser(): Promise<void> {
  const username = getUsername();
  const isFav = await isFavorite(username);
  const link = createFavoriteLink(isFav);
  link.onclick = () => toggleFavorite(link, username);
}

async function isFavorite(username: string): Promise<boolean> {
  var favs: string[] = JSON.parse((await GM.getValue('FavoriteUsers')) ?? '[]');
  return favs.includes(username);
}

async function addFavorite(username: string): Promise<void> {
  var favs: string[] = JSON.parse((await GM.getValue('FavoriteUsers')) ?? '[]');
  var newFavs = [...favs.filter(x => x != username), username];
  await GM.setValue('FavoriteUsers', JSON.stringify(newFavs));
}

async function removeFavorite(username: string): Promise<void> {
  var favs: string[] = JSON.parse((await GM.getValue('FavoriteUsers')) ?? '[]');
  var newFavs = favs.filter(x => x != username);
  await GM.setValue('FavoriteUsers', JSON.stringify(newFavs));
}

function getUsername(): string {
  const target = document.getElementById('PublicProfileHeadline');
  if (!target) {
    throw new Error('username not found');
  }
  return target.textContent ?? '';
}

async function toggleFavorite(link: HTMLElement, username: string): Promise<void> {
  const icon = link.childNodes[0] as HTMLElement;
  const text = link.childNodes[1] as HTMLElement;

  if (await isFavorite(username)) {
    await removeFavorite(username);
    icon.classList.remove(isFavoriteClass);
    icon.classList.add(addFavoriteClass);
    text.textContent = addFavoriteText;
  } else {
    await addFavorite(username);
    icon.classList.remove(addFavoriteClass);
    icon.classList.add(isFavoriteClass);
    text.textContent = isFavoriteText;
  }
}

function createFavoriteLink(isFavorite: boolean): HTMLElement {
  const memoLink = document.getElementById('memoLink');

  const favoriteLink = document.createElement('div');
  favoriteLink.classList.add('personalInfoRow', 'col-6', 'col-md-12');
  const icon = document.createElement('span');
  icon.classList.add('fonticon-color-primary', 'mr-2', isFavorite ? isFavoriteClass : addFavoriteClass);
  favoriteLink.appendChild(icon);
  const text = document.createElement('span');
  text.classList.add('clickable');
  text.textContent = isFavorite ? isFavoriteText : addFavoriteText;
  favoriteLink.appendChild(text);

  memoLink?.parentElement?.appendChild(favoriteLink);

  return favoriteLink;
}

const isFavoriteClass = 'fonticon-star';
const isFavoriteText = 'Remove Favorite';
const addFavoriteClass = 'fonticon-star-empty';
const addFavoriteText = 'Add Favorite';
