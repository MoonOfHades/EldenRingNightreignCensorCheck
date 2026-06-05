/**
 * @jest-environment-options {"url": "http://localhost/EldenRingNightreignCensorCheck/"}
 */

import { APP_BASE_PATH } from '../../constants/AppConstants';
import Game from '../../model/Game';
import GameLanguage from '../../model/GameLanguage';
import {
  getSavedGame,
  getSavedLanguage,
  saveSelectedGame,
  saveSelectedLanguage,
} from '../../util/UserPreferences';

function clearPreferenceCookies() {
  const expiredCookie = 'max-age=0';
  document.cookie = `erncc_selected_game=; ${expiredCookie}; path=${APP_BASE_PATH}`;
  document.cookie = `erncc_selected_language=; ${expiredCookie}; path=${APP_BASE_PATH}`;
}

describe('UserPreferences', () => {
  beforeEach(() => {
    clearPreferenceCookies();
  });

  describe('getSavedGame / saveSelectedGame', () => {
    it('returns null when no game cookie is set', () => {
      expect(getSavedGame()).toBeNull();
    });

    it('round-trips a supported game selection', () => {
      saveSelectedGame(Game.ELDEN_RING_NIGHTREIGN);

      expect(getSavedGame()).toBe(Game.ELDEN_RING_NIGHTREIGN);
    });

    it('returns null for an unsupported game value in the cookie', () => {
      document.cookie = `erncc_selected_game=${encodeURIComponent(Game.ESCAPE_FROM_MERIDELL_CASTLE_REMASTERED)}; path=${APP_BASE_PATH}`;

      expect(getSavedGame()).toBeNull();
    });
  });

  describe('getSavedLanguage / saveSelectedLanguage', () => {
    it('returns null when no language cookie is set', () => {
      expect(getSavedLanguage()).toBeNull();
    });

    it('round-trips a supported language selection', () => {
      saveSelectedLanguage(GameLanguage.Japanese);

      expect(getSavedLanguage()).toBe(GameLanguage.Japanese);
    });

    it('returns null for an unknown language label in the cookie', () => {
      document.cookie = `erncc_selected_language=${encodeURIComponent('Klingon')}; path=${APP_BASE_PATH}`;

      expect(getSavedLanguage()).toBeNull();
    });
  });
});
