import React, { useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import updateRegister from '../../functions/updateRegister';
import Swal from 'sweetalert2';
import './RegisterInfo.css';

const RegisterInfo = ({ register, onDelete, refreshTable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: register.name,
    bviCompanyNumber: register.bviCompanyNumber,
    jurisdiction: register.jurisdiction,
    date: register.date,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: register.name,
      bviCompanyNumber: register.bviCompanyNumber,
      jurisdiction: register.jurisdiction,
      date: register.date,
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await updateRegister(register.id, formData);
      setIsEditing(false);
      refreshTable();
      Swal.fire('Updated!', 'The record has been successfully updated.', 'success');
    } catch (error) {
      Swal.fire('Error!', 'There was a problem updating the record.', 'error');
    }
  };

  return (
    <tr className='row-info'>
      <th>
        {isEditing ? (
          <input
            type="text"
            name="name"
            className='input-edit'
            value={formData.name}
            onChange={handleInputChange}
          />
        ) : (
          register.name
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
          register.bviCompanyNumber
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
          register.jurisdiction
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
          register.date
        )}
      </th>
      <th>
        {isEditing ? (
          <>
            <button className='save-btn success' onClick={handleSave}>Guardar</button>
            <button className='cancel-btn danger' onClick={handleCancel}>Cancelar</button>
          </>

        ) : (
          <>
            <button className='edit-btn success' onClick={handleEdit}><MdEdit /></button>
            <button className='delete-btn danger' onClick={() => onDelete(register.id)}><MdDelete /></button>
          </>
        )}
      </th>
    </tr>
  );
};

export default RegisterInfo;
