import React, { useState } from 'react';
import './PdfExtractor.css';
import { Document, pdfjs } from 'react-pdf';
import register from '../../functions/register';
import Swal from 'sweetalert2';

// Configuración del trabajador para PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfExtractor = ({ pdfFile, onReset }) => {
    // Definición de estados para almacenar información extraída
    const [name, setName] = useState('');
    const [bviCompanyNumber, setBviCompanyNumber] = useState('');
    const [jurisdiction, setJurisdiction] = useState('');
    const [date, setDate] = useState('');

    // Función que se llama cuando el documento se carga correctamente
    function onDocumentLoadSuccess() {
        extractText(pdfFile); // Llamar a la función para extraer texto del PDF
    }

    // Función para extraer texto del PDF
    function extractText(pdfFile) {
        // Crear una tarea de carga para el documento PDF
        const loadingTask = pdfjs.getDocument(pdfFile);
        loadingTask.promise.then((pdf) => {

            // Función para extraer texto de una página
            const extractPageText = (page) => {
                return page.getTextContent().then((textContent) => {
                    const pageText = textContent.items.map((s) => s.str).join(' ');
                    return pageText; // Devolver el texto de la página
                });
            };

            // Expresiones regulares para buscar patrones en el texto extraído
            const regexName = /in respect of incorporation having been complied with,\s*([\s\S]*?)\s*BVI COMPANY NUMBER:/;
            const regexCompanyNumber = /BVI COMPANY NUMBER:\s*(\d+)/;
            const regexJurisdiction = /is incorporated in the\s+([A-Z\s]+)\s+as a BVI BUSINES COMPANY,/;
            const regexDate = /as a BVI BUSINES COMPANY, this(.*?)\./s;

            // Función para extraer texto de todas las páginas
            const extractAllPagesText = async () => {
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i); // Obtener la página
                    const pageText = await extractPageText(page); // Extraer texto de la página

                    // Coincidir y almacenar información usando las expresiones regulares
                    const matchName = pageText.match(regexName);
                    if (matchName) {
                        setName(matchName[1].trim()); // Almacenar el nombre
                    }

                    const matchCompanyNumber = pageText.match(regexCompanyNumber);
                    if (matchCompanyNumber) {
                        setBviCompanyNumber(matchCompanyNumber[1]); // Almacenar el número de compañía
                    }

                    const matchJurisdiction = pageText.match(regexJurisdiction);
                    if (matchJurisdiction) {
                        setJurisdiction(matchJurisdiction[1].trim()); // Almacenar la jurisdicción
                    }

                    const matchDate = pageText.match(regexDate);
                    if (matchDate) {
                        setDate(matchDate[1]); // Almacenar la fecha
                    }
                }
            };

            extractAllPagesText(); // Llamar a la función para extraer texto de todas las páginas
        });
    }

    // Función para manejar el envío del formulario
    function submitHandler(e) {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
        const name = e.target.name.value; // Obtener el nombre del formulario
        const bviCompanyNumber = e.target.bviCompanyNumber.value; // Obtener el número de compañía
        const jurisdiction = e.target.jurisdiction.value; // Obtener la jurisdicción
        const date = e.target.date.value; // Obtener la fecha

        const data = { name, bviCompanyNumber, jurisdiction, date }; // Crear objeto con la información

        // Mostrar un cuadro de confirmación antes de registrar la información
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#17a2b8",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await register(data); // Registrar la información usando la función importada
                onReset(); // Reiniciar el formulario o la vista
                // Mostrar un mensaje de éxito
                Swal.fire({
                    title: "Great",
                    text: "Your information has been successfully registered.",
                    icon: "success",
                    confirmButtonColor: "#17a2b8",
                });
            }
        });
    }

    return (
        <div>
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}></Document>
            <div>
                <h2>Information from PDF:</h2>
                <form onSubmit={submitHandler} className='form'>
                    <div className='info'>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} readOnly />
                    </div>
                    <div className='info'> 
                        <label htmlFor="bviCompanyNumber">Company Registration Number:</label>
                        <input type="text" id="bviCompanyNumber" value={bviCompanyNumber} readOnly />
                    </div>
                    <div className='info'>
                        <label htmlFor="jurisdiction">Jurisdiction:</label>
                        <input type="text" id="jurisdiction" value={jurisdiction} readOnly />
                    </div>
                    <div className='info'>
                        <label htmlFor="date">Date:</label>
                        <input type="text" id="date" value={date} readOnly />
                    </div>
                    <button type="submit" className='register'>Register</button>
                    <button onClick={onReset} className='back'>Go back</button>
                </form>
            </div>
        </div>
    );
};

export default PdfExtractor;
