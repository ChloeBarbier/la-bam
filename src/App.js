import React from 'react';
import './App.scss';
import { Provider } from './config/state.manager';
import Form from './Form';

const App = () => (
  <Provider>
    <div className="App">
      <div className="App-head">La boite à prénoms</div>
      <header className="App-header">
        <Form />
      </header>
    </div>
  </Provider>
);

export default App;
