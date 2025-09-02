import { generateBlockedNamePreview } from '../../util/CensorUtils';

/* Unit tests for blocked name preview to prevent regression over time (I keep breaking it). Rules so far for future reference (may be changed based on future examples to the contrary):
 - Larger words should be censored with priority (so if "ass" and "asss" are both blocked in the input "asssman", the output should be "****man")
 - Single words should be censored even if the player attempts to break them up with non-letter/numbers (so if "ass" is blocked, "a ss" should be censored to "****", and "a  ss" should be censored to "*****")
 - Phrases with non-letter/number characters should be censored, so if both "titties" and "anime titties" are blocked phrases, the input "anime titties" should be censored as "*************")
 - The above rules should all apply in conjunction, so if the input is "ass anime tit ties a ss man" and "ass", "titties", and "anime titties" are in the blocked list, the output should be "*** ************** **** man"
 */

describe('generateBlockedNamePreview', () => {
  it('does not censor words that do not match', () => {
    expect(generateBlockedNamePreview('Player Name Okay', ['fuck'])).toBe(
      'Player Name Okay',
    );
  });

  // In-game confirmed or popular examples
  it('censors real examples correctly', () => {
    expect(generateBlockedNamePreview('Hand of Okina', ['fok'])).toBe(
      'Hand o****ina',
    );

    // This is a case where a bad word can show up in-game when the letters are broken up by other
    // censored words. A "friend" of mine has confirmed this in-game at their own peril
    expect(generateBlockedNamePreview('FhoUhoChoK', ['ho'])).toBe('F**U**C**K');

    expect(generateBlockedNamePreview('Crucible Knight', ['nig'])).toBe(
      'Crucible K***ht',
    );
    expect(generateBlockedNamePreview('John Nightreign', ['nig'])).toBe(
      'John ***htreign',
    );
  });

  it('censors with trailing punctuation', () => {
    expect(generateBlockedNamePreview('Player Name fuck!', ['fuck'])).toBe(
      'Player Name ****!',
    );
  });

  it('handles multiple censored words', () => {
    expect(generateBlockedNamePreview('hello world', ['hello', 'world'])).toBe(
      '***** *****',
    );
  });

  it('preserves non-letter/number chars outside censored regions', () => {
    expect(generateBlockedNamePreview('What the fuck?!', ['fuck'])).toBe(
      'What the ****?!',
    );
  });

  it('censors across spaces within a blocked word', () => {
    expect(generateBlockedNamePreview('he llo, world.', ['hello'])).toBe(
      '******, world.',
    );
  });

  // This exceeds the player name character count, but the logic in this function should apply to all input sizes
  it('handles blocked words and blocked phrases without censoring spaces incorrectly', () => {
    const input = 'ass anime titties a ss man';
    const blockedWords = ['ass', 'anime titties', 'titties', 'tit', 'titt'];
    const result = generateBlockedNamePreview(input, blockedWords);

    expect(result).toBe('*** ************* **** man');
  });

  it('handles extra spaces within both blocked phrases and blocked words', () => {
    const input = 'ass ani  me titties a ss man';
    const blockedWords = ['ass', 'anime titties', 'titties', 'tit', 'titt'];
    const result = generateBlockedNamePreview(input, blockedWords);

    expect(result).toBe('*** *************** **** man');
  });

  it('supports accented characters', () => {
    expect(generateBlockedNamePreview("Jérôme l'aime", ['jérôme'])).toBe(
      "****** l'aime",
    );
  });

  it('supports Japanese characters', () => {
    expect(generateBlockedNamePreview('プレイヤー名前テスト', ['名前'])).toBe(
      'プレイヤー**テスト',
    );

    expect(
      generateBlockedNamePreview('プレイヤー名前テスト', ['プレイヤー']),
    ).toBe('*****名前テスト');
  });

  it('supports cyrillic characters', () => {
    expect(generateBlockedNamePreview('Привет мир', ['прив'])).toBe(
      '****ет мир',
    );
  });

  it('censors ignoring case', () => {
    expect(generateBlockedNamePreview('Hello World', ['HELLO'])).toBe(
      '***** World',
    );
  });

  it('ignores blocked empty string', () => {
    expect(generateBlockedNamePreview('Hello World', [''])).toBe('Hello World');
  });

  it('handles empty list', () => {
    expect(generateBlockedNamePreview('Hello World', [])).toBe('Hello World');
  });

  it('handles blocked words appearing multiple times', () => {
    expect(generateBlockedNamePreview('bad bad bad', ['bad'])).toBe(
      '*** *** ***',
    );
  });

  it('handles words with mixed letters and numbers', () => {
    expect(generateBlockedNamePreview('UserX1234', ['x123'])).toBe('User****4');
  });
});
