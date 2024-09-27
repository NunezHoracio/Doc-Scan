import React, { useState } from 'react';
import './App.css';
import Upload from './components/upload/Upload';

function App() {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey(prevKey => prevKey + 1);
  };

  return (
    <>
      <header>
        <Upload key={resetKey} onReset={handleReset} />
      </header>
    </>
  );
}

export default App;
