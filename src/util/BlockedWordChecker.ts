import AhoCorasick from 'ahocorasick';

export interface BlockedWordChecker {
  // Return all blocked words contained in a given string as an unordered set (empty if nothing is blocked)
  findBlockedWords(playerName: string): Set<string>;
}

// https://en.wikipedia.org/wiki/Aho%E2%80%93Corasick_algorithm
export default class AhoCorasickBlockedWordChecker
  implements BlockedWordChecker
{
  private ahocorasick: AhoCorasick;

  constructor(blockedWordsForLanguage: string[]) {
    this.ahocorasick = new AhoCorasick(blockedWordsForLanguage);
  }

  findBlockedWords(playerName: string): Set<string> {
    const results = this.ahocorasick.search(playerName) as [number, string[]][];

    const blockedWords = new Set<string>();

    for (const [, foundWords] of results) {
      for (const foundWord of foundWords) {
        blockedWords.add(foundWord);
      }
    }

    return blockedWords;
  }
}
