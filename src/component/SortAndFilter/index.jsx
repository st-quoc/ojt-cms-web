export const SortAndFilter = ({
  sortBy,
  onSortChange,
  itemsPerPage,
  onItemsPerPageChange,
}) => (
  <div className="filter">
    {/* Sorting */}
    <div className="flex items-center space-x-1">
      <span>Sort By</span>
      <select
        value={sortBy}
        onChange={onSortChange}
        className="border rounded px-2 py-1 cursor-pointer"
      >
        <option value="default">Default</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
        <option value="newest">Newest</option>
      </select>
    </div>

    {/* Items per page */}
    <div className="flex items-center space-x-1">
      <span>Show</span>
      <select
        value={itemsPerPage}
        onChange={onItemsPerPageChange}
        className="border rounded px-2 py-1 cursor-pointer"
      >
        <option value={9}>9</option>
        <option value={15}>15</option>
        <option value={18}>18</option>
      </select>
    </div>
  </div>
);
