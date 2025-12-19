import React, { useState } from 'react';
import type { User } from '../../types/user';
import ActionSelect from './ActionSelect';

interface Props {
  user: User;
  index: number;
  onDelete: (user: User) => void;
  onEdit: (user: User) => void;
  onToggleActive: (user: User) => void;
}

const UserRow: React.FC<Props> = ({ user, index, onDelete, onEdit, onToggleActive }) => {
  const handleEdit = () => {
    onEdit(user);
  };

  const handleDelete = () => {
    onDelete(user);
  };

  const handleToggleActive = () => {
    onToggleActive(user);
  };

  return (
    <>
      <tr
        className={`mt-2 mb-2 ${
          user.status === 'UNACTIVE' ? 'bg-red-200' : (index + 1) % 2 === 0 ? 'bg-gray-200' : ''
        }`}
      >
        <td className="text-center">{index + 1}</td>
        <td className="text-left">{user.name}</td>
        <td className="text-left">{user.email}</td>
        <td className="text-center">{user.status}</td>

        <td className="text-center p-2">
          <ActionSelect
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
            itemStatus={user.status}
          />
        </td>
      </tr>
    </>
  );
};

export default UserRow;
