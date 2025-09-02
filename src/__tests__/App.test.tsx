import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../App';
import { act } from 'react';

test('Renders the main page', async () => {
  await act(async () => render(<App />));

  expect(true).toBeTruthy();
});
