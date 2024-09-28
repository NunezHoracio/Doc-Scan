import React, { useState } from 'react'; // Importa React y el hook useState
import './App.css'; // Importa el archivo de estilos CSS
import Upload from './components/upload/Upload'; // Importa el componente Upload

function App() {
  // Define un estado llamado resetKey con valor inicial de 0
  const [resetKey, setResetKey] = useState(0);

  // Función para manejar el restablecimiento
  const handleReset = () => {
    // Incrementa el valor de resetKey en 1
    setResetKey(prevKey => prevKey + 1);
  };

  return (
    <>
      <header>
        {/* Renderiza el componente Upload y le pasa resetKey como key y handleReset como prop onReset */}
        <Upload key={resetKey} onReset={handleReset} />
      </header>
    </>
  );
}

export default App; // Exporta el componente App para su uso en otras partes de la aplicación
