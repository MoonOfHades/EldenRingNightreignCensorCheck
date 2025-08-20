import React from 'react';
import logo from './logo.svg';
import './App.css';
import NameCheckerForm from './components/NameCheckerForm';
import LanguageBlockedWordListResolver from './util/LanguageBlockedListResolver';
import GameType from './model/GameType';
import Language from './model/Language';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          (Site in development)
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          (Site in development)
        </a>
      </header>
      <NameCheckerForm blockedWordResolver={new LanguageBlockedWordListResolver(GameType.ELDEN_RING_NIGHTREIGN, Language.English)}/>
    </div>
  );
}

export default App;
