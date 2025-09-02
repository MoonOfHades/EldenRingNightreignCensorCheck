// Unicode-aware, should work across languages
export const LETTER_NUMBER_REGEX = /\p{L}|\p{N}/u;
export const NON_LETTER_NUMBER_REGEX_GLOBAL = /[^\p{L}\p{N}]/gu;
export const CENSOR_CHAR = '*';

// Escape reserved regex characters for blocked word regexp
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 
    Leetcode ass problem, I hope this never needs to be updated
 */
export const generateBlockedNamePreview = function (
  name: string,
  blockedWords: Array<string>,
) {
  // Remove spaces from phrases. the actual blocked words are known to the frontend outside of this function,
  // so here we can just treat blocked phrases the same as blocked words broken up by non-letter/number chars
  const blockedWordsNoSpace = blockedWords.map((word) =>
    word.replace(NON_LETTER_NUMBER_REGEX_GLOBAL, ''),
  );

  // Assumption: words are censored from longest to shortest
  const sortedBlockedWords = blockedWordsNoSpace.sort(
    (a, b) => b.length - a.length,
  );

  // The censor check seems to ignore spaces.
  // Additional assumption: this also applies to all non-letter/number characters
  // Temporarily remove non-letter/number characters to determine censored chars.
  const nameNoSpace = name.replace(NON_LETTER_NUMBER_REGEX_GLOBAL, '');

  // Regions of string containing blocked words
  const censoredPositions = new Array(name.length).fill(false);

  for (const word of sortedBlockedWords) {
    if (!word) continue;

    const regex = new RegExp(escapeRegExp(word), 'giu');
    let match: RegExpExecArray | null;

    while ((match = regex.exec(nameNoSpace))) {
      const start = match.index;
      const end = start + match[0].length;

      // Convert no-space indices back to original indices
      let originalStart = 0;
      let noSpaceCount = 0;

      // Find the starting position in the original string
      for (let i = 0; i < name.length; i++) {
        if (LETTER_NUMBER_REGEX.test(name[i])) {
          if (noSpaceCount === start) {
            originalStart = i;
            break;
          }
          noSpaceCount++;
        }
      }

      let letterCount = 0;
      let originalEnd = originalStart;

      // Find the original ending position
      for (
        let i = originalStart;
        i < name.length && letterCount < match[0].length;
        i++
      ) {
        if (LETTER_NUMBER_REGEX.test(name[i])) {
          letterCount++;
        }
        originalEnd = i + 1;
      }

      // Mark all positions in range to be censored
      for (let i = originalStart; i < originalEnd; i++) {
        censoredPositions[i] = true;
      }

      // Prevent infinite loop if regex matches empty string
      if (match.index === regex.lastIndex) regex.lastIndex++;
    }
  }

  // Build the censored string preview with original spaces (or non-letter/number chars) added
  let result = '';
  for (let i = 0; i < name.length; i++) {
    result += censoredPositions[i] ? CENSOR_CHAR : name[i];
  }

  return result;
};
