export interface Player {
  id?: number;
  player: string;
  team: string;
  number: number;
  nation: string;
  position: string;
  age: number;
  minutes: number;
  goals: number;
  assists: number;
  penaltyShootOnGoal: number;
  penaltyShoot: number;
  totalShoot: number;
  shootOnTarget: number;
  yellowCards: number;
  redCards: number;
  touches: number;
  dribbles: number;
  tackles: number;
  blocks: number;
  xg: number;
  npxg: number;
  xag: number;
  shotCreatingActions: number;
  goalCreatingActions: number;
  passesCompleted: number;
  passesAttempted: number;
  passCompletion: number;
  progressivePasses: number;
  carries: number;
  progressiveCarries: number;
  dribbleAttempts: number;
  successfulDribbles: number;
  date: string;
}

export interface PlayerFilters {
  team?: string;
  name?: string;
  position?: string;
  nation?: string;
}

export type PlayerFormData = Omit<Player, 'id'>;

export const POSITIONS = ['GK', 'DF', 'MF', 'FW'] as const;

export const PREMIER_LEAGUE_TEAMS = [
  'Arsenal',
  'Aston Villa',
  'Bournemouth',
  'Brentford',
  'Brighton',
  'Chelsea',
  'Crystal Palace',
  'Everton',
  'Fulham',
  'Ipswich Town',
  'Leicester City',
  'Liverpool',
  'Manchester City',
  'Manchester United',
  'Newcastle United',
  'Nottingham Forest',
  'Southampton',
  'Tottenham',
  'West Ham United',
  'Wolverhampton',
] as const;
