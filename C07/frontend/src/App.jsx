import React from 'react';

import Header from './components/Header';
import Nav from './components/Nav';
import Bookshelf from './components/Bookshelf';

const App = () => (
  <div className="App">
    <h1>Welcome to the bookself app</h1>
    <Nav />
    <Header />
    <Bookshelf />
  </div>
);

export default App;
