import React from 'react'

function App() {
  // const name = 'gabe'
  const styles = {
    mainContainer: {
      backgroundColor: 'pink'
    }
  }
  return (
    <div 
      className="App"//{name} 
      style={styles.mainContainer}
    >
      <h1>
        Hello world
      </h1>
    </div>
  );
}

export default App;
