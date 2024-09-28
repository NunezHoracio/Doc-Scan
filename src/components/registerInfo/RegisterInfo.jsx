import React, { useState } from 'react'; // Importa React y useState desde la librería React
import { MdDelete, MdEdit } from 'react-icons/md'; // Importa iconos de eliminar y editar
import updateRegister from '../../functions/updateRegister'; // Importa la función para actualizar registros
import Swal from 'sweetalert2'; // Importa SweetAlert2 para mostrar alertas
import './RegisterInfo.css'; // Importa el archivo CSS para estilos

// Componente RegisterInfo que recibe propiedades register, onDelete y refreshTable
const RegisterInfo = ({ register, onDelete, refreshTable }) => {
  // Estado para controlar si está en modo edición
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    name: register.name,
    bviCompanyNumber: register.bviCompanyNumber,
    jurisdiction: register.jurisdiction,
    date: register.date,
  });

  // Maneja la acción de editar, cambiando el estado a modo edición
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Cancela la edición y restablece los datos al registro original
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: register.name,
      bviCompanyNumber: register.bviCompanyNumber,
      jurisdiction: register.jurisdiction,
      date: register.date,
    });
  };

  // Maneja los cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Obtiene el nombre y valor del campo
    setFormData({ ...formData, [name]: value }); // Actualiza el estado de formData
  };

  // Guarda los cambios al registro
  const handleSave = async () => {
    try {
      await updateRegister(register.id, formData); // Llama a la función para actualizar el registro
      setIsEditing(false); // Cambia el estado a no editar
      refreshTable(); // Refresca la tabla para mostrar los datos actualizados
      Swal.fire('Updated!', 'The record has been successfully updated.', 'success'); // Muestra una alerta de éxito
    } catch (error) {
      Swal.fire('Error!', 'There was a problem updating the record.', 'error'); // Muestra una alerta de error
    }
  };

  return (
    <tr className='row-info'> {/* Fila de la tabla con clase CSS 'row-info' */}
      <th>
        {isEditing ? ( // Si está en modo edición, muestra un campo de entrada
          <input
            type="text"
            name="name"
            className='input-edit'
            value={formData.name}
            onChange={handleInputChange}
          />
        ) : (
          register.name // Si no está editando, muestra el nombre del registro
        )}
      </th>
      <th>
        {isEditing ? (
          <input
            type="text"
            name="bviCompanyNumber"
            className='input-edit'
            value={formData.bviCompanyNumber}
            onChange={handleInputChange}
          />
        ) : (
          register.bviCompanyNumber // Muestra el número de la empresa si no está editando
        )}
      </th>
      <th>
        {isEditing ? (
          <input
            type="text"
            name="jurisdiction"
            className='input-edit'
            value={formData.jurisdiction}
            onChange={handleInputChange}
          />
        ) : (
          register.jurisdiction // Muestra la jurisdicción si no está editando
        )}
      </th>
      <th>
        {isEditing ? (
          <input
            type="text"
            name="date"
            className='input-edit'
            value={formData.date}
            onChange={handleInputChange}
          />
        ) : (
          register.date // Muestra la fecha si no está editando
        )}
      </th>
      <th>
        {isEditing ? ( // Si está editando, muestra los botones de guardar y cancelar
          <>
            <button className='save-btn success' onClick={handleSave}>Guardar</button>
            <button className='cancel-btn danger' onClick={handleCancel}>Cancelar</button>
          </>
        ) : (
          <> {/* Si no está editando, muestra los botones de editar y eliminar */}
            <button className='edit-btn success' onClick={handleEdit}><MdEdit /></button>
            <button className='delete-btn danger' onClick={() => onDelete(register.id)}><MdDelete /></button>
          </>
        )}
      </th>
    </tr>
  );
};

export default RegisterInfo; // Exporta el componente para ser utilizado en otros archivos
