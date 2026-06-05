import { APP_BASE_PATH } from '../constants/AppConstants';
import Game from '../model/Game';
import GameLanguage from '../model/GameLanguage';

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const SELECTED_GAME_COOKIE = 'erncc_selected_game';
const SELECTED_LANGUAGE_COOKIE = 'erncc_selected_language';

const SUPPORTED_GAMES = new Set<Game>([
  Game.ELDEN_RING,
  Game.ELDEN_RING_NIGHTREIGN,
]);

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const encodedName = encodeURIComponent(name);
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${encodedName}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string) {
  if (typeof document === 'undefined') {
    return;
  }

  const encodedName = encodeURIComponent(name);
  const encodedValue = encodeURIComponent(value);

  document.cookie = `${encodedName}=${encodedValue}; max-age=${COOKIE_MAX_AGE_SECONDS}; path=${APP_BASE_PATH}; SameSite=Lax`;
}

export function getSavedGame(): Game | null {
  const savedGame = getCookie(SELECTED_GAME_COOKIE);

  if (savedGame && SUPPORTED_GAMES.has(savedGame as Game)) {
    return savedGame as Game;
  }

  return null;
}

export function saveSelectedGame(game: Game) {
  setCookie(SELECTED_GAME_COOKIE, game);
}

export function getSavedLanguage(): GameLanguage | null {
  const savedLanguageLabel = getCookie(SELECTED_LANGUAGE_COOKIE);

  if (!savedLanguageLabel) {
    return null;
  }

  try {
    return GameLanguage.fromLabel(savedLanguageLabel);
  } catch {
    return null;
  }
}

export function saveSelectedLanguage(language: GameLanguage) {
  setCookie(SELECTED_LANGUAGE_COOKIE, language.label);
}
