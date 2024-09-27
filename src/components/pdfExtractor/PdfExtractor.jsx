import React, { useState } from 'react';
import './PdfExtractor.css';
import { Document, pdfjs } from 'react-pdf';
import register from '../../functions/register';
import Swal from 'sweetalert2';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfExtractor = ({ pdfFile, onReset }) => {
    const [name, setName] = useState('');
    const [bviCompanyNumber, setBviCompanyNumber] = useState('');
    const [jurisdiction, setJurisdiction] = useState('');
    const [date, setDate] = useState('');

    function onDocumentLoadSuccess() {
        extractText(pdfFile);
    }

    function extractText(pdfFile) {
        const loadingTask = pdfjs.getDocument(pdfFile);
        loadingTask.promise.then((pdf) => {

            const extractPageText = (page) => {
                return page.getTextContent().then((textContent) => {
                    const pageText = textContent.items.map((s) => s.str).join(' ');
                    return pageText;
                });
            };

            const regexName = /in respect of incorporation having been complied with,\s*([\s\S]*?)\s*BVI COMPANY NUMBER:/;
            const regexCompanyNumber = /BVI COMPANY NUMBER:\s*(\d+)/;
            const regexJurisdiction = /is incorporated in the\s+([A-Z\s]+)\s+as a BVI BUSINES COMPANY,/;
            const regexDate = /as a BVI BUSINES COMPANY, this(.*?)\./s;

            const extractAllPagesText = async () => {
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const pageText = await extractPageText(page);

                    const matchName = pageText.match(regexName);
                    if (matchName) {
                        setName(matchName[1].trim());
                    }

                    const matchCompanyNumber = pageText.match(regexCompanyNumber);
                    if (matchCompanyNumber) {
                        setBviCompanyNumber(matchCompanyNumber[1]);
                    }

                    const matchJurisdiction = pageText.match(regexJurisdiction);
                    if (matchJurisdiction) {
                        setJurisdiction(matchJurisdiction[1].trim());
                    }

                    const matchDate = pageText.match(regexDate);
                    if (matchDate) {
                        setDate(matchDate[1]);
                    }
                }
            };

            extractAllPagesText();
        });
    }

    function submitHandler(e) {
        e.preventDefault();
        const name = e.target.name.value;
        const bviCompanyNumber = e.target.bviCompanyNumber.value;
        const jurisdiction = e.target.jurisdiction.value;
        const date = e.target.date.value;

        const data = { name, bviCompanyNumber, jurisdiction, date };
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#17a2b8",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await register(data);
                onReset();
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
                        <input type="text" id="bviCompanyNumber" value={bviCompanyNumber} readOnly /></div>
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
