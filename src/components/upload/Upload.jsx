import React, { useState, useRef, useEffect } from 'react';
import PdfExtractor from '../pdfExtractor/PdfExtractor'; // Importa el componente PdfExtractor para procesar PDFs.
import './Upload.css'; // Importa los estilos para este componente.
import getRegisters from '../../functions/getRegisters'; // Importa la función para obtener registros.
import ViewAllRegisters from '../viewAllRegisters/ViewAllRegisters'; // Importa el componente para visualizar todos los registros.

const Upload = ({ onReset }) => {
  // Hook para manejar el ciclo de vida del componente.
  useEffect(() => {
    // Al montar el componente, se obtienen los registros y se guardan en el estado.
    getRegisters().then(registers => { setAllRegisters(registers); });
  }, []);

  // Estados para manejar los registros, el archivo PDF y la vista actual.
  const [allRegisters, setAllRegisters] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [view, setView] = useState(null);

  // Referencias para los elementos del DOM.
  const inputRef = useRef();
  const dropRef = useRef();

  // Función para manejar el cambio en el input de archivos.
  const handlePdfChange = (e) => {
    const selectedFile = e.target.files[0]; // Obtiene el archivo seleccionado.
    const reader = new FileReader(); // Crea un lector de archivos.

    reader.onload = (event) => {
      setPdf(event.target.result); // Al cargar el archivo, guarda el contenido en el estado.
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile); // Lee el archivo como un URL de datos.
    }
  };

  // Maneja el evento de arrastrar archivos sobre el área de dropzone.
  const handleDragOver = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto.
    dropRef.current.classList.add('dragging'); // Añade clase para indicar que se está arrastrando un archivo.
  };

  const handleDragEnter = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto.
    dropRef.current.classList.add('dragging'); // Añade clase para indicar que se ha entrado en el área de dropzone.
  };

  const handleDragLeave = () => {
    dropRef.current.classList.remove('dragging'); // Remueve la clase al salir del área de dropzone.
  };

  // Maneja el evento de soltar un archivo en el área de dropzone.
  const handleDrop = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto.
    dropRef.current.classList.remove('dragging'); // Remueve la clase de arrastre.
    const selectedFile = e.dataTransfer.files[0]; // Obtiene el archivo soltado.

    const reader = new FileReader();
    reader.onload = (event) => {
      setPdf(event.target.result); // Al cargar el archivo, guarda el contenido en el estado.
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile); // Lee el archivo como un URL de datos.
    }
  };

  // Si ya hay un PDF cargado, renderiza el componente PdfExtractor.
  if (pdf) {
    return (
      <div className="upload">
        <PdfExtractor pdfFile={pdf} onReset={onReset} />
      </div>
    );
  }

  // Si hay una vista activa, renderiza el componente ViewAllRegisters.
  if (view) {
    return (
      <ViewAllRegisters onReset={onReset} registers={allRegisters} />
    );
  }

  // Renderiza la zona de dropzone para subir archivos o seleccionar uno.
  return (
    <div className='main-container'>
      <div
        className="dropzone"
        ref={dropRef} // Referencia al área de dropzone.
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop} // Maneja el evento de soltar un archivo.
      >
        <h1>Drag and Drop File to Upload</h1> {/* Mensaje de instrucciones */}
        <h2>Or</h2>
        <input
          type="file"
          accept="application/pdf" // Acepta solo archivos PDF.
          hidden
          onChange={handlePdfChange} // Maneja el cambio de archivo.
          ref={inputRef} // Referencia al input para archivos.
        />
        <button onClick={() => inputRef.current.click()} className='primary'>Select File</button> {/* Botón para seleccionar archivo */}
      </div>
      <button onClick={() => setView('show')} className='primary'>View Registers</button> {/* Botón para mostrar registros */}
    </div>
  );
};

export default Upload; // Exporta el componente para su uso en otras partes de la aplicación.
