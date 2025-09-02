import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { act } from 'react';

// src/__ tests __/App.test.tsx

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', async () => {
  await act(async () => render(<App />));

  expect(true).toBeTruthy();
});
