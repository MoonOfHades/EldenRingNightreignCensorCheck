# EldenRingNightreignCensorCheck

Name censor checking tool for Elden Ring Nightreign (and base Elden Ring) multiplayer. Hosted on Github Pages at:

### https://moonofhades.github.io/EldenRingNightreignCensorCheck/

## Context

Currenly in both games your player name is always uncensored on your end, but it might show as censored to other players online, which makes it difficult to know whether or not your name is censored without help (or waiting for a Victor's Record to show up in Nightreign).

Names are censored if they contain anything from a list of blocked words/phrases for your selected game language, which results in [strange cases](https://en.wikipedia.org/wiki/Scunthorpe_problem) like names containing "Knight" being censored in a game filled with knights.

Use this tool to check if your cool/funny name will make it past the filter.

## Dev Notes and Limitations:

- I'm not sure how often the blocked word lists change (if at all), but I'll try to periodically keep them up to date as updates come in, with Nightreign as a priority. Feel free to [open an issue](https://github.com/MoonOfHades/EldenRingNightreignCensorCheck/issues) if you notice some cases where the checker is inaccurate, but note the below detail:
  - Apparently the name censoring for most Souls games is done on the name owner's end, so there are player-side workarounds and mods that can enable bypassing the filter (this is why you'll sometimes see "John Nightreign" uncensored in Nightreign). Because of this, one-off cases where a player other than yourself had their name show as uncensored online (but censored in this tool) will be difficult to look into unless you know for sure that the player was using a vanilla installation of the game (and which language they're using).
- Nightreign and base Elden Ring have different blocked word lists, so there are names that may be censored in one game but not the other. This tool has separate tabs for ER and ER: Nightreign for that reason.
- I am a native-English speaker only, so extensive testing of this tool is mainly done in English besides making sure that the blocked word lists for other languages aren't noticably malformed
- Due to the nature of this project, the repository contains text files with a lot of bad words in multiple languages. I did not use text to speech for this :)

### Censor check implementation assumptions:

For the censored name previews with the "\*"'s included, I implemented and tweaked the logic based on real examples that I've experienced, and common cases ike "Crucible K\*\*\*ht" along with the following assumptions. This may be updated over time if there were edge cases I missed or misinterpreted. Assumptions:

- Nightreign and Elden Ring use the same censoring logic, but not the same blocked word lists
- When multiple blocked words are in a name, they are censored in priority order from longest to shortest (example: "asshole" matches blocked words: [asshole, hole, ass, ss, ho]. The output in-game is \*\*\*\*\*\*\*)
- The censor check is not case-sensitive (though it was in some previous games)
- The censor check ignores spaces, and will censor blocked words that are broken up by space (example: if "hello" is a blocked word, "h ello" will be fully censored as "\*\*\*\*\*\*")
  - In my implementation I've extended this behavior to apply any non-letter or number character (example: "h.ello" should still be censored the same way), but this is an unconfirmed assumption.

## Special thanks

- [DarkSouls3CensorCheck](https://omgftw.github.io/DarkSouls3CensorCheck/) ([GitHub](https://github.com/omgftw/DarkSouls3CensorCheck?tab=readme-ov-file)) - This project was implemented from scratch and uses different name-checking logic, but I did intentionally use a similar UI layout to this existing tool for DS3 to make it easy to use for those who are already familiar with that one.

- [Smithbox](https://github.com/vawser/Smithbox) was used for exporting the blocked list files as JSON in order to create the text files used by this project.

- [Fromsoft Image Macro Creator](https://rezuaq.be/new-area/image-creator/) ([GitHub](https://github.com/Sibert-Aerts/sibert-aerts.github.io)) was used for creating some of the banner images used on the UI.

## Disclaimer

This is a fan project, and is not endorsed by or affiliated with FromSoftware, Inc.
