enum Game {
  ELDEN_RING = 'Elden Ring',
  ELDEN_RING_NIGHTREIGN = 'Elden Ring Nightreign',
  ESCAPE_FROM_MERIDELL_CASTLE_REMASTERED = 'This is a joke',
}

export function maxNameLengthForGame(game: Game): number {
  switch (game) {
    case Game.ELDEN_RING:
    case Game.ELDEN_RING_NIGHTREIGN:
    default:
      return 16;
  }
}

export default Game;
