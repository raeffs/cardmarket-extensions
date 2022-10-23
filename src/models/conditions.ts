export const enum Conditions {
  Mint = 1,
  NearMint = 2,
  Excellent = 3,
  Good = 4,
  LightPlayed = 5,
  Played = 6,
  Poor = 7,
}

export function parseCondition(condition: string | null): Conditions {
  switch (condition) {
    case 'MT':
      return Conditions.Mint;
    case 'NM':
      return Conditions.NearMint;
    case 'EX':
      return Conditions.Excellent;
    case 'GD':
      return Conditions.Good;
    case 'LP':
      return Conditions.LightPlayed;
    case 'PL':
      return Conditions.Played;
    default:
      return Conditions.Poor;
  }
}
