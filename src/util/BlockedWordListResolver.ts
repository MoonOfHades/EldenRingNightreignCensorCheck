import GameType from '../model/Game';
import GameLanguage from '../model/GameLanguage';

export default class BlockedWordListResolver {
  private blockedWordsFilename: string;

  constructor(game: GameType, language: GameLanguage) {
    var gameFolderName: string;

    switch (game) {
      case GameType.ELDEN_RING:
        gameFolderName = 'eldenring';
        break;
      case GameType.ELDEN_RING_NIGHTREIGN:
      default:
        gameFolderName = 'nightreign';
        break;
    }

    this.blockedWordsFilename = `./assets/badwords/${gameFolderName}/${language.fileName}.txt`;
  }

  getBlockedWordsFilename = (): string => {
    return this.blockedWordsFilename;
  };
}
