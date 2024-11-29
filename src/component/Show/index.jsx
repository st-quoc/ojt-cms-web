export const Show = ({ itemsPerPage, handleItemsPerPageChange }) => {
  return (
    <div className="flex items-center space-x-1">
      <span>Show</span>
      <select
        className="border rounded px-2 py-1 cursor-pointer"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        <option value={12}>12</option>
        <option value={20}>20</option>
        <option value={40}>40</option>
      </select>
    </div>
  );
};

export default Show;
