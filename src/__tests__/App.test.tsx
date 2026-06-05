/**
 * @jest-environment-options {"url": "http://localhost/EldenRingNightreignCensorCheck/"}
 */

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import App from '../App';
import { APP_BASE_PATH } from '../constants/AppConstants';
import Game from '../model/Game';
import GameLanguage from '../model/GameLanguage';
import {
  saveSelectedGame,
  saveSelectedLanguage,
} from '../util/UserPreferences';

function clearPrefCookies() {
  const expiredCookie = 'max-age=0';
  document.cookie = `erncc_selected_game=; ${expiredCookie}; path=${APP_BASE_PATH}`;
  document.cookie = `erncc_selected_language=; ${expiredCookie}; path=${APP_BASE_PATH}`;
}

describe('App', () => {
  beforeEach(() => {
    clearPrefCookies();
  });

  test('renders the main page', async () => {
    await act(async () => render(<App />));

    expect(true).toBeTruthy();
  });

  test('restores the saved game tab and language from cookies on load', async () => {
    saveSelectedGame(Game.ELDEN_RING_NIGHTREIGN);
    saveSelectedLanguage(GameLanguage.Japanese);

    await act(async () => render(<App />));

    const selectedTab = screen.getByRole('tab', { selected: true });
    expect(selectedTab).not.toHaveAttribute('id', 'eldenRingTab');
    expect(screen.getByRole('combobox')).toHaveTextContent('Japanese');
  });

  test('restores the Elden Ring tab from cookies on load', async () => {
    saveSelectedGame(Game.ELDEN_RING);
    saveSelectedLanguage(GameLanguage.French);

    await act(async () => render(<App />));

    expect(screen.getByRole('tab', { selected: true })).toHaveAttribute(
      'id',
      'eldenRingTab',
    );
    expect(screen.getByRole('combobox')).toHaveTextContent('French');
  });
});
