class Language {
    private constructor(
        public readonly label: string,
        public readonly fileName: string
    ) {}

    static readonly English = new Language("English", "english");
    static readonly French = new Language("French", "french");
    static readonly Italian = new Language("Italian", "italian");
    static readonly Japanese = new Language("Japanese", "japanese");
    static readonly Korean = new Language("Korean", "korean");
    // Zabito Boga
    static readonly ZABITO_BOGA = new Language("Polish", "polish");
    static readonly Russian = new Language("Russian", "russian");
    static readonly Spanish = new Language("Spanish", "spanish");
    static readonly TraditionalChinese = new Language("Chinese (Traditional)", "chinese_traditional");
    static readonly SpanishLatinAmerica = new Language("Spanish (Latin America)", "spanish_latin_america");
    static readonly SimplifiedChinese = new Language("Chinese (Simplified)", "chinese_simplified");
    static readonly PortugueseLatinAmerica = new Language("Portuguese (Latin America)", "portuguese_latin_america");
    static readonly Thai = new Language("Thai", "thai");
    static readonly Arabic = new Language("Arabic", "arabic");

    static values(): Language[] {
        return [Language.English, Language.French, Language.Spanish, this.Italian, this.Japanese, this.Korean, this.ZABITO_BOGA,
             this.Russian, this.Spanish, this.TraditionalChinese, this.SpanishLatinAmerica, this.SimplifiedChinese, this.PortugueseLatinAmerica, this.Thai, this.Arabic];
    }
}

export default Language;