import React from 'react';

import NavBarClass from './Components/NavBarClass'
import NavBarFunc from './Components/NavBarFunc'

function App() {
  return (
    <div
      style={{textAlign: 'center'}}

    >
      <NavBarClass />
      <NavBarFunc />
      <h1>
        Home
      </h1>
    </div>
  );
}

export default App;
