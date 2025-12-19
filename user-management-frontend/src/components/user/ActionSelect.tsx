interface Props {
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
  disabled?: boolean;
  itemStatus?: string;
}

const ActionSelect: React.FC<Props> = ({ onEdit, onDelete, onToggleActive, itemStatus }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    switch (value) {
      case 'edit':
        onEdit();
        break;
      case 'toggleActive':
        onToggleActive();
        break;
      case 'delete':
        onDelete();
        break;
    }
    e.target.value = '';
  };

  return (
    <select
      defaultValue=""
      onChange={handleChange}
      className="
        w-full max-w-full
        rounded-md border border-gray-300
        bg-white px-2 py-1 text-sm
        focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500
      "
    >
      <option value="" disabled>
        Action
      </option>
      <option value="edit">Edit</option>
      <option value="toggleActive">{itemStatus === 'ACTIVE' ? 'Un-active' : 'Active'}</option>
      <option value="delete">Delete</option>
    </select>
  );
};

export default ActionSelect;
