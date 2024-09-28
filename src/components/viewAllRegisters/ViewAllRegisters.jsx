import React, { useEffect, useState } from 'react'; // Importar React y hooks
import RegisterInfo from '../registerInfo/RegisterInfo'; // Importar el componente que muestra información de un registro
import getRegisters from '../../functions/getRegisters'; // Importar función para obtener registros de Firebase
import deleteRegister from '../../functions/deleteRegister'; // Importar función para eliminar un registro de Firebase
import Swal from 'sweetalert2'; // Importar SweetAlert2 para alertas
import * as XLSX from 'xlsx'; // Importar la librería XLSX para exportar a Excel
import './ViewAllRegisters.css'; // Importar estilos CSS para el componente

const ViewAllRegisters = ({ onReset, registers }) => {
  // Definición del componente ViewAllRegisters
  const [filterName, setFilterName] = useState(''); // Estado para almacenar el filtro por nombre
  const [filterBviCompanyNumber, setFilterBviCompanyNumber] = useState(''); // Estado para almacenar el filtro por número de registro
  const [filterJurisdiction, setFilterJurisdiction] = useState(''); // Estado para almacenar el filtro por jurisdicción
  const [filterDate, setFilterDate] = useState(''); // Estado para almacenar el filtro por fecha
  const [allRegisters, setAllRegisters] = useState(registers || []); // Almacena todos los registros o un array vacío si no hay registros

  // Función para manejar el cambio en los filtros
  const handleFilterChange = (e, setFilter) => {
    setFilter(e.target.value); // Actualiza el estado del filtro con el valor ingresado
  };

  // Filtrar los registros según los filtros aplicados
  const filteredRegisters = allRegisters.filter(register =>
    register.name.toLowerCase().includes(filterName.toLowerCase()) &&
    register.bviCompanyNumber.toLowerCase().includes(filterBviCompanyNumber.toLowerCase()) &&
    register.jurisdiction.toLowerCase().includes(filterJurisdiction.toLowerCase()) &&
    register.date.toLowerCase().includes(filterDate.toLowerCase())
  );

  // Función para refrescar la tabla de registros
  const refreshTable = () => {
    getRegisters() // Obtener registros desde Firebase
      .then(registers => {
        setAllRegisters(registers); // Actualizar el estado con los registros obtenidos
      })
      .catch(err => {
        console.log('Error al refrescar la tabla:', err); // Manejo de errores
      });
  };

  useEffect(() => {
    refreshTable(); // Llama a la función para refrescar la tabla al montar el componente
  }, []);

  // Función para manejar la eliminación de un registro
  const handleDelete = async (id) => {
    if (!id) return; // Si no hay id, salir de la función

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
          await deleteRegister(id); // Eliminar usando el `id` del registro
          refreshTable(); // Actualizar la tabla después de eliminar
          Swal.fire(
            'Deleted!',
            'The record has been deleted.',
            'error' // Mensaje de éxito
          );
        } catch (error) {
          console.log('Error al eliminar el registro:', error); // Manejo de errores
          Swal.fire(
            'Error!',
            'There was an error deleting the record.',
            'error' // Mensaje de error
          );
        }
      }
    });
  };

  // Función para exportar los registros filtrados a un archivo de Excel
  const exportToExcel = () => {
    const headers = [["Name", "Company Registration Number", "Jurisdiction", "Date"]]; // Encabezados personalizados para el Excel

    // Convierte los registros filtrados a un array de arrays para la exportación
    const dataToExport = filteredRegisters.map(register => [
      register.name,
      register.bviCompanyNumber,
      register.jurisdiction,
      register.date
    ]);

    // Crea una hoja de Excel
    const worksheet = XLSX.utils.aoa_to_sheet(headers); // Comienza con los encabezados
    XLSX.utils.sheet_add_aoa(worksheet, dataToExport, { origin: "A2" }); // Agrega los datos empezando en la fila 2

    const workbook = XLSX.utils.book_new(); // Crea un nuevo libro de Excel
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registers"); // Agrega la hoja al libro
    XLSX.writeFile(workbook, "Registers.xlsx"); // Descarga el archivo como 'Registers.xlsx'
  };

  return (
    <div className='table-container'>
      <div className='input-container'>
        <label className='filter'>
          Filter by Name:
          <input
            type='text'
            value={filterName}
            onChange={(e) => handleFilterChange(e, setFilterName)} // Llama a handleFilterChange para actualizar el filtro
            className='input-form'
          />
        </label>
        <label className='filter'>
          Company Registration Number:
          <input
            type='text'
            value={filterBviCompanyNumber}
            onChange={(e) => handleFilterChange(e, setFilterBviCompanyNumber)} // Llama a handleFilterChange para actualizar el filtro
            className='input-form'
          />
        </label>
        <label className='filter'>
          Filter by Jurisdiction:
          <input
            type='text'
            value={filterJurisdiction}
            onChange={(e) => handleFilterChange(e, setFilterJurisdiction)} // Llama a handleFilterChange para actualizar el filtro
            className='input-form'
          />
        </label>
        <label className='filter'>
          Filter by Date:
          <input
            type='text'
            value={filterDate}
            onChange={(e) => handleFilterChange(e, setFilterDate)} // Llama a handleFilterChange para actualizar el filtro
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
              key={register.id} // Utiliza el `id` del registro como clave única
              register={register}
              onDelete={handleDelete} // Pasa la función handleDelete como prop
              refreshTable={refreshTable} // Pasa la función refreshTable como prop
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

export default ViewAllRegisters; // Exportar el componente para ser utilizado en otros lugares
