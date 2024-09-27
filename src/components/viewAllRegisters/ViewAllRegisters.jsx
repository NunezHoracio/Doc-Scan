import React, { useEffect, useState } from 'react';
import RegisterInfo from '../registerInfo/RegisterInfo';
import getRegisters from '../../functions/getRegisters';
import deleteRegister from '../../functions/deleteRegister';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; // Importar la librería XLSX
import './ViewAllRegisters.css';

const ViewAllRegisters = ({ onReset, registers }) => {
  const [filterName, setFilterName] = useState('');
  const [filterBviCompanyNumber, setFilterBviCompanyNumber] = useState('');
  const [filterJurisdiction, setFilterJurisdiction] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [allRegisters, setAllRegisters] = useState(registers || []); // Almacena los registros

  const handleFilterChange = (e, setFilter) => {
    setFilter(e.target.value);
  };

  const filteredRegisters = allRegisters.filter(register =>
    register.name.toLowerCase().includes(filterName.toLowerCase()) &&
    register.bviCompanyNumber.toLowerCase().includes(filterBviCompanyNumber.toLowerCase()) &&
    register.jurisdiction.toLowerCase().includes(filterJurisdiction.toLowerCase()) &&
    register.date.toLowerCase().includes(filterDate.toLowerCase())
  );

  const refreshTable = () => {
    getRegisters()
      .then(registers => {
        setAllRegisters(registers); // Asegúrate de que `registers` incluye el `id`
      })
      .catch(err => {
        console.log('Error al refrescar la tabla:', err);
      });
  };

  useEffect(() => {
    refreshTable();
  }, []);

  const handleDelete = async (id) => {
    if (!id) return;

    // Mostrar cuadro de confirmación de SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteRegister(id); // Elimina usando el `id` del documento
          refreshTable(); // Actualiza la tabla después de eliminar
          Swal.fire(
            'Deleted!',
            'The record has been deleted.',
            'error'
          );
        } catch (error) {
          console.log('Error al eliminar el registro:', error);
          Swal.fire(
            'Error!',
            'There was an error deleting the record.',
            'error'
          );
        }
      }
    });
  };

  // Función para exportar a Excel con encabezados personalizados
const exportToExcel = () => {
  // Especifica los encabezados personalizados
  const headers = [["Name", "Company Registration Number", "Jurisdiction", "Date"]];

  // Convierte los registros filtrados en un array de arrays para exportar
  const dataToExport = filteredRegisters.map(register => [
    register.name,
    register.bviCompanyNumber,
    register.jurisdiction,
    register.date
  ]);

  // Convierte los datos a una hoja de Excel
  const worksheet = XLSX.utils.aoa_to_sheet(headers); // Comienza con los encabezados
  XLSX.utils.sheet_add_aoa(worksheet, dataToExport, { origin: "A2" }); // Agrega los datos empezando en la fila 2

  const workbook = XLSX.utils.book_new(); // Crea un nuevo libro de Excel
  XLSX.utils.book_append_sheet(workbook, worksheet, "Registers"); // Agrega la hoja al libro
  XLSX.writeFile(workbook, "Registers.xlsx"); // Descarga el archivo como 'registers.xlsx'
};

  return (
    <div className='table-container'>
      <div className='input-container'>
        <label className='filter'>
          Filter by Name:
          <input
            type='text'
            value={filterName}
            onChange={(e) => handleFilterChange(e, setFilterName)}
            className='input-form'
          />
        </label>
        <label className='filter'>
          Company Registration Number:
          <input
            type='text'
            value={filterBviCompanyNumber}
            onChange={(e) => handleFilterChange(e, setFilterBviCompanyNumber)}
            className='input-form'
          />
        </label>
        <label className='filter'>
          Filter by Jurisdiction:
          <input
            type='text'
            value={filterJurisdiction}
            onChange={(e) => handleFilterChange(e, setFilterJurisdiction)}
            className='input-form'
          />
        </label>
        <label className='filter'>
          Filter by Date:
          <input
            type='text'
            value={filterDate}
            onChange={(e) => handleFilterChange(e, setFilterDate)}
            className='input-form'
          />
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th className='table-items'>Name</th>
            <th className='table-items'>Company Registration Number</th>
            <th className='table-items'>Jurisdiction</th>
            <th className='table-items'>Date</th>
            <th className='table-items'>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRegisters.map(register => (
            <RegisterInfo
              key={register.id} // El `id` del documento es usado como `key`
              register={register}
              onDelete={handleDelete} // Pasamos handleDelete como prop
              refreshTable={refreshTable}
            />
          ))}
        </tbody>
      </table>

      <div className="buttons">
        <button onClick={onReset} className='back primary'>Go back</button>
        <button onClick={exportToExcel} className='export primary'>Export to Excel</button>
      </div>
    </div>
  );
};

export default ViewAllRegisters;
