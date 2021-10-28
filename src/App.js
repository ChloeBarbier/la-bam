import React from 'react';
import './App.scss';
import { Provider } from './config/state.manager';
import Form from './Form';
import ListSelector from './ListSelector';

const App = () => (
  <Provider>
    <div id="la-bam" className="App">
      <main class="main">
        <div className="App-title">
          <span className="title">La boite à 
            <ListSelector name='liste' />
          </span>
          <div className="help">Have fun! Crée de nouveaux mots à l'infini...</div>
        </div>
        <div className="App-content">
          <Form />
        </div>
      </main>
    </div>
  </Provider>
);

export default App;
