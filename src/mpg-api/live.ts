export interface RootObject {
  stadium: string;
  dateMatch: Date;
  rating: string;
  teamHome: Team;
  teamAway: Team;
  players: Players;
}

export interface Team {
  id: string;
  name: string;
  jerseyHome: string;
  jerseyAway: string;
  jerseyUrl: string;
  abbr: string;
  coach: string;
  star: boolean;
  score: number;
  composition: number;
  substitutes: Substitute[];
  mpguser: string;
  userId: string;
}

export interface Substitute {
  subs: string;
  start: string;
  rating: number;
  substituteName: string;
  starterName: string;
}

export interface Goals {
  goal: number;
  own_goal: number;
}

export interface Away {
  playerId: string;
  number: string;
  firstname: string;
  name: string;
  teamid: any;
  position: number;
  starter?: number;
  goals: Goals;
  redCard?: number;
  yellowCard?: number;
  rating?: number;
  definitiveRating?: boolean;
}

export interface Home {
  playerId: string;
  number: string;
  firstname: string;
  name: string;
  teamid: any;
  position: number;
  starter: number;
  goals: Goals;
  redCard: number;
  yellowCard: number;
  definitiveRating: boolean;
  rating?: number;
}

export interface Players {
  home: Home[];
  away: Away[];
}
