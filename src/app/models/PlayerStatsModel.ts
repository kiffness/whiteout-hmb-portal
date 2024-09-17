export type PlayerStats = {
  id: string;
  created: Date;
  playerName: string;
  troopsAmount: number;
  maxLevelTroop: number;
  rallyCap: number;
  furnaceLevel: number;
  activeTime: string;
  powerLevel: number;
};

export type PlayerStatsDto = {
  troopsAmount: number;
  maxLevelTroop: number;
  rallyCap: number;
  furnaceLevel: number;
  powerLevel: number;
};
