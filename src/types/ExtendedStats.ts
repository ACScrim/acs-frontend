export interface ExtendedStats {
  memberSince: string;
  lastSeen: string;
  participationStreak: number;
  gameStats: Array<{
    gameId: string;
    gameName: string;
    gameImage?: string;
    wins: number;
    losses: number;
    totalPlayed: number;
    winRate: number;
  }>;
  socialStats: {
    teamsFormed: number;
    uniqueTeammates: number;
    frequentTeammates: Array<{
      playerId: string;
      username: string;
      count: number;
    }>;
    winningPartners: Array<{
      playerId: string;
      username: string;
      wins: number;
    }>;
  };
  records: {
    longestWinStreak: number;
  };
}
