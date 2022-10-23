export const enum Languages {
  All = 0,
  English = 1,
  French = 2,
  German = 3,
  Spanish = 4,
  Italian = 5,
  SimplifiedChinese = 6,
  Japanese = 7,
  Portuguese = 8,
  Russian = 9,
  Korean = 10,
  TraditionalChinese = 11,
  Dutch = 12,
  Polish = 13,
  Czech = 14,
  Hungarian = 15,
}

export function parseLanguage(language: string | null): Languages {
  switch (language) {
    case 'English':
      return Languages.English;
    case 'French':
      return Languages.French;
    case 'German':
      return Languages.German;
    case 'Spanish':
      return Languages.Spanish;
    case 'Italian':
      return Languages.Italian;
    case 'S-Chinese':
      return Languages.SimplifiedChinese;
    case 'Japanese':
      return Languages.Japanese;
    case 'Portuguese':
      return Languages.Portuguese;
    case 'Russian':
      return Languages.Russian;
    case 'Korean':
      return Languages.Korean;
    case 'T-Chinese':
      return Languages.TraditionalChinese;
    case 'Dutch':
      return Languages.Dutch;
    case 'Polish':
      return Languages.Polish;
    case 'Czech':
      return Languages.Czech;
    case 'Hungarian':
      return Languages.Hungarian;
    default:
      return Languages.All;
  }
}
