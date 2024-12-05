export const Show = ({ itemsPerPage, handleItemsPerPageChange }) => {
  return (
    <div className="flex items-center space-x-1">
      <span>Show</span>
      <select
        className="border rounded px-2 py-1 cursor-pointer"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        <option value={8}>8</option>
        <option value={12}>12</option>
        <option value={16}>16</option>
      </select>
    </div>
  );
};

export default Show;
