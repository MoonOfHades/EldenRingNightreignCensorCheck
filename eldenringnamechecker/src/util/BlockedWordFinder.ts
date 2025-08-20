import GameType from "../model/GameType";
import AhoCorasick from 'ahocorasick';
import LanguageBlokedWordListResolver from "./LanguageBlockedListResolver"

export interface BlockedWordFinder {
    // Return all blocked words contained in a given string as an unordered set (empty if nothing is blocked).
    // Due diligence dictates that I use an interface in case the library I'm using explodes but tbh it's probably fine,
    // this is my project so I get to merge this code to main without any code reviews anyway  ¯\_(ツ)_/¯
    findBlockedWords(playerName: string) : Set<string>;
}

export default class AhocorasickWordFinder implements BlockedWordFinder {
    private ahocorasick: AhoCorasick;

    constructor(blockedWordsForLanguage: string[]) {
        this.ahocorasick = new AhoCorasick(blockedWordsForLanguage);
    }

    findBlockedWords(playerName: string): Set<string> {
        var results: [number, string[]][] = this.ahocorasick.search(playerName);

        const blockedWords = new Set<string>();

        
        for (const [number, foundWords] of results) {
            for (const foundWord of foundWords) {
                 blockedWords.add(foundWord)
            }
        }

        return blockedWords;
    }
}

