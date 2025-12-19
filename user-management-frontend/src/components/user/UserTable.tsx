import React from 'react';
import UserRow from './UserRow';
import type { User } from '../../types/user';

interface Props {
  users: User[];
  onDelete: (user: User) => void;
  onEdit: (user: User) => void;
  onToggleActive: (user: User) => void;
}

const UserTable: React.FC<Props> = ({ users, onDelete, onEdit, onToggleActive }) => {
  return (
    <table className="w-full table-fixed border-1">
      <colgroup>
        <col className="w-1" />
        <col className="w-4" />
        <col className="w-4" />
        <col className="w-2" />
        <col className="w-1" />
      </colgroup>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => (
          <UserRow
            key={user.id}
            user={user}
            index={index}
            onDelete={onDelete}
            onEdit={onEdit}
            onToggleActive={onToggleActive}
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
