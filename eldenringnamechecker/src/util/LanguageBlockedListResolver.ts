import GameType from "../model/GameType";
import Language from "../model/Language";

export default class LanguageBlockedWordListResolver {
    private blockedWordsFilename: string;

    constructor(game: GameType, language: Language) {

        var gameFolderName: string;

        switch (game) {
            case GameType.ELDEN_RING:
                gameFolderName = "eldenring"
                break;
            case GameType.ELDEN_RING_NIGHTREIGN:
            default:
                gameFolderName = "nightreign"
                break;
        }

        this.blockedWordsFilename = `${process.env.PUBLIC_URL}/assets/badwords/${gameFolderName}/${language.fileName}.txt`
        Error(this.blockedWordsFilename)
    }

    getBlockedWordsFilename = (): string => {
        return this.blockedWordsFilename;
    }
}
