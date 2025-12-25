import { useEffect, useState } from 'react';
import UserTable from '../components/user/UserTable';
import type { User } from '../types/user';
import Modal from '../components/common/Modal';
import { useUserStore, type UpdateUserDto } from '../store/userStore';

const UserManagePage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const users = useUserStore((state) => state.users);
  const addUser = useUserStore((state) => state.addUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const deleteUser = useUserStore((state) => state.deleteUser);
  const MODAL_TYPES = {
    CONFIRM_DELETE: 'CONFIRM_DELETE',
    EDIT: 'EDIT',
    TOGGLE_ACTIVE: 'TOGGLE_ACTIVE',
    ADD: 'ADD',
  } as const;
  type ModalType = (typeof MODAL_TYPES)[keyof typeof MODAL_TYPES];
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const isModalOpen = modalType !== null;
  const openModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const handleDelete = (userId: string) => {
    deleteUser(userId);
    setSelectedUser(null);
    closeModal();
  };
  const handleEdit = (updatedUser: User) => {
    if (isEmailDuplicate(updatedUser.email, updatedUser.id)) {
      return false;
    }
    const { id, ...data }: { id: string } & UpdateUserDto = updatedUser;
    updateUser(id, data);

    setSelectedUser(null);
    closeModal();
    return true;
  };
  const handleToggleActive = (updatedUser: User) => {
    const newStatus = updatedUser.status === 'ACTIVE' ? 'UNACTIVE' : 'ACTIVE';
    updateUser(updatedUser.id, {
      status: newStatus,
    });

    setSelectedUser(null);
    closeModal();
  };
  const handleAdd = (newUser: User) => {
    if (isEmailDuplicate(newUser.email)) {
      return false;
    }
    const { id, ...data } = newUser;
    addUser(data);
    closeModal();
    return true;
  };
  const isEmailDuplicate = (email: string, excludeUserId?: string) => {
    return users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.id !== excludeUserId
    );
  };

  return (
    <div className="w-full h-full p-5">
      <div className="flex flex-col items-center">
        <h2 className="text-red-500 mt-10 mb-10 text-[2rem]">User Management</h2>
        <div className="w-[700px]">
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white
                          hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            onClick={() => openModal(MODAL_TYPES.ADD)}
          >
            Add User
          </button>
          <UserTable
            users={users}
            onDelete={(user) => {
              setSelectedUser(user);
              openModal(MODAL_TYPES.CONFIRM_DELETE);
            }}
            onEdit={(user) => {
              setSelectedUser(user);
              openModal(MODAL_TYPES.EDIT);
            }}
            onToggleActive={(user) => {
              setSelectedUser(user);
              openModal(MODAL_TYPES.TOGGLE_ACTIVE);
            }}
          />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalType === MODAL_TYPES.CONFIRM_DELETE && (
          <ConfirmDelete
            user={selectedUser}
            onCancel={() => {
              setSelectedUser(null);
              closeModal();
            }}
            onDelete={handleDelete}
          />
        )}
        {modalType === MODAL_TYPES.EDIT && (
          <EditModal
            user={selectedUser}
            onCancel={() => {
              setSelectedUser(null);
              closeModal();
            }}
            onEdit={handleEdit}
          />
        )}
        {modalType === MODAL_TYPES.TOGGLE_ACTIVE && (
          <ConfirmToggleActiveDelete
            user={selectedUser}
            onCancel={() => {
              setSelectedUser(null);
              closeModal();
            }}
            onConfirm={handleToggleActive}
          />
        )}
        {modalType === MODAL_TYPES.ADD && (
          <AddModal
            onCancel={() => {
              closeModal();
            }}
            onAdd={handleAdd}
          />
        )}
      </Modal>
    </div>
  );
};

export default UserManagePage;

interface EditModalProps {
  user: User | null;
  onEdit: (updatedUser: User) => boolean;
  onCancel: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ user, onEdit, onCancel }) => {
  if (!user) return;
  const [form, setForm] = useState<User>(user);
  const [error, setError] = useState('');

  const isValidEmail = (email: string) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required');
      return;
    }
    if (!isValidEmail(form.email)) {
      setError('Invalid email format');
      return;
    }
    const ok = onEdit(form);
    if (!ok) {
      setError('Email already exists');
    }
  };

  return (
    <>
      <h2 className="mb-4 text-lg font-semibold">Edit User</h2>
      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="mb-2 w-full rounded border px-2 py-1"
        placeholder="Edit name"
      />

      <input
        type="text"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="mb-4 w-full rounded border px-2 py-1"
        placeholder="Edit email"
      />
      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="rounded-md px-4 py-2 text-sm hover:bg-gray-100">
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </>
  );
};

interface ConfirmDeleteProps {
  user: User | null;
  onDelete: (userId: string) => void;
  onCancel: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ user, onDelete, onCancel }) => {
  if (!user) return;
  return (
    <>
      <h2 className="mb-2 text-lg font-semibold">Delete User</h2>
      <p className="mb-4 text-sm text-gray-600">Are you sure you want to delete {user.name} </p>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="rounded-md px-4 py-2 text-sm hover:bg-gray-100">
          Cancel
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </>
  );
};

interface ConfirmToggleActiveProps {
  user: User | null;
  onConfirm: (user: User) => void;
  onCancel: () => void;
}

const ConfirmToggleActiveDelete: React.FC<ConfirmToggleActiveProps> = ({
  user,
  onConfirm,
  onCancel,
}) => {
  if (!user) return;
  return (
    <>
      <h2 className="mb-2 text-lg font-semibold">
        {user.status === 'ACTIVE' ? 'Un-active' : 'Active'} User
      </h2>
      <p className="mb-4 text-sm text-gray-600">
        Are you sure you want to {user.status === 'ACTIVE' ? 'Un-active' : 'Active'} {user.name}{' '}
      </p>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="rounded-md px-4 py-2 text-sm hover:bg-gray-100">
          Cancel
        </button>
        <button
          onClick={() => onConfirm(user)}
          className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          {user.status === 'ACTIVE' ? 'Un-active' : 'Active'}
        </button>
      </div>
    </>
  );
};

interface AddModalProps {
  onAdd: (newUser: User) => boolean;
  onCancel: () => void;
}

const AddModal: React.FC<AddModalProps> = ({ onAdd, onCancel }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  const [error, setError] = useState('');
  const isValidEmail = (email: string) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required');
      return;
    }
    if (!isValidEmail(form.email)) {
      setError('Invalid email format');
      return;
    }
    const newUser: User = {
      id: 'virtual',
      name: form.name.trim(),
      email: form.email.trim(),
      status: 'ACTIVE',
    };

    const ok = onAdd(newUser);
    if (!ok) {
      setError('Email already exists');
    }
  };
  return (
    <>
      <h2 className="mb-4 text-lg font-semibold">Add User</h2>
      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="mb-2 w-full rounded border px-2 py-1"
        placeholder="Edit name"
      />

      <input
        type="text"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="mb-4 w-full rounded border px-2 py-1"
        placeholder="Edit email"
      />
      {error && <p className="mb-2 text-sm text-red-600">{error}</p>}

      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="rounded-md px-4 py-2 text-sm hover:bg-gray-100">
          Cancel
        </button>

        <button
          onClick={handleSave}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </>
  );
};
