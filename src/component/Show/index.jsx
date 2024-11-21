export const Show = ({ itemsPerPage, handleItemsPerPageChange }) => {
  return (
    <div className="flex items-center space-x-1">
      <span>Show</span>
      <select
        className="border rounded px-2 py-1 cursor-pointer"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        <option value={9}>9</option>
        <option value={15}>15</option>
        <option value={18}>18</option>
      </select>
    </div>
  );
};

export default Show;
