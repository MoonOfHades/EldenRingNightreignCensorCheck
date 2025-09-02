class GameLanguage {
  private constructor(
    public readonly label: string,
    public readonly fileName: string,
  ) {}

  static readonly English = new GameLanguage('English', 'english');
  static readonly French = new GameLanguage('French', 'french');
  static readonly German = new GameLanguage('German', 'german');
  static readonly Italian = new GameLanguage('Italian', 'italian');
  static readonly Japanese = new GameLanguage('Japanese', 'japanese');
  static readonly Korean = new GameLanguage('Korean', 'korean');
  // Zabito Boga
  static readonly ZABITO_BOGA = new GameLanguage('Polish', 'polish');
  static readonly Russian = new GameLanguage('Russian', 'russian');
  static readonly Spanish = new GameLanguage('Spanish', 'spanish');
  static readonly TraditionalChinese = new GameLanguage(
    'Chinese (Traditional)',
    'chinese_traditional',
  );
  static readonly SpanishLatinAmerica = new GameLanguage(
    'Spanish (Latin America)',
    'spanish_latin_america',
  );
  static readonly SimplifiedChinese = new GameLanguage(
    'Chinese (Simplified)',
    'chinese_simplified',
  );
  static readonly PortugueseLatinAmerica = new GameLanguage(
    'Portuguese - Latin America',
    'portuguese_latin_america',
  );
  static readonly Thai = new GameLanguage('Thai', 'thai');
  static readonly Arabic = new GameLanguage('Arabic', 'arabic');

  static values(): GameLanguage[] {
    return [
      this.English,
      this.French,
      this.German,
      this.Italian,
      this.Japanese,
      this.Korean,
      this.ZABITO_BOGA,
      this.Russian,
      this.Spanish,
      this.SpanishLatinAmerica,
      this.TraditionalChinese,
      this.SimplifiedChinese,
      this.PortugueseLatinAmerica,
      this.Thai,
      this.Arabic,
    ];
  }

  static languagesByLabel: Map<string, GameLanguage> = new Map(
    GameLanguage.values().map(
      (language) => [language.label, language] as const,
    ),
  );

  static fromLabel(label: string) {
    const foundLanguage = this.languagesByLabel.get(label);

    if (foundLanguage) {
      return foundLanguage;
    }

    throw Error(`Language not found for given label: ${label}`);
  }
}

export default GameLanguage;
