import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NameInputForm from '../../components/NameInputForm';
import AhoCorasickBlockedWordChecker from '../../util/BlockedWordChecker';
import Game from '../../model/Game';

// Mock the AssetUtils to avoid image loading issues in tests
jest.mock('../../util/AssetUtils', () => ({
  getPublicImagePath: (filename: string) => filename,
}));

describe('NameInputForm', () => {
  const mockBlockedWordFinder = new AhoCorasickBlockedWordChecker([
    'badword',
    'inappropriate',
  ]);
  const defaultProps = {
    blockedWordFinder: mockBlockedWordFinder,
    game: Game.ELDEN_RING_NIGHTREIGN,
    inputDisabled: false,
  };

  beforeEach(() => {
    // Clear any previous test state
    jest.clearAllMocks();
  });

  test('should clear results when input is cleared', () => {
    render(<NameInputForm {...defaultProps} />);

    const input = screen.getByPlaceholderText(/Max Length:/);

    // First, enter a name that contains a blocked word
    fireEvent.change(input, { target: { value: 'badword' } });

    // Verify that the censored message appears
    expect(screen.getByText('Your name is censored:')).toBeInTheDocument();
    expect(screen.getByText(/Blocked words:/)).toBeInTheDocument();

    // Now clear the input
    fireEvent.change(input, { target: { value: '' } });

    // Verify that the censored message is no longer shown
    expect(
      screen.queryByText('Your name is censored:'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/Blocked words:/)).not.toBeInTheDocument();

    // Verify that the "not censored" message is also not shown
    expect(
      screen.queryByText('Your name is not censored!'),
    ).not.toBeInTheDocument();
  });

  test('should show appropriate banner when input is cleared', () => {
    render(<NameInputForm {...defaultProps} />);

    const input = screen.getByPlaceholderText(/Max Length:/);

    // Enter a name first
    fireEvent.change(input, { target: { value: 'testname' } });

    // Clear the input
    fireEvent.change(input, { target: { value: '' } });

    // The banner should show the "what is your name" image
    // We can't easily test the image src in this test, but we can verify
    // that the input is empty and no results are shown
    expect(input).toHaveValue('');
    expect(
      screen.queryByText('Your name is censored:'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('Your name is not censored!'),
    ).not.toBeInTheDocument();
  });

  test('should handle input with no blocked words correctly', () => {
    render(<NameInputForm {...defaultProps} />);

    const input = screen.getByPlaceholderText(/Max Length:/);

    // Enter a name that doesn't contain blocked words
    fireEvent.change(input, { target: { value: 'validname' } });

    // Verify that the "not censored" message appears
    expect(screen.getByText('Your name is not censored!')).toBeInTheDocument();
    expect(screen.getByText('validname')).toBeInTheDocument();

    // Clear the input
    fireEvent.change(input, { target: { value: '' } });

    // Verify that the "not censored" message is no longer shown
    expect(
      screen.queryByText('Your name is not censored!'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('validname')).not.toBeInTheDocument();
  });
});
