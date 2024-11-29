export const Sort = ({ filters, setFilters }) => {
  const handleSortChange = event => {
    setFilters(prevFilters => ({
      ...prevFilters,
      sortBy: event.target.value,
    }));
  };

  return (
    <div className="flex items-center space-x-1">
      <span>Sort By</span>
      <select
        className="border rounded px-2 py-1 cursor-pointer"
        value={filters.sortBy}
        onChange={handleSortChange}
      >
        <option value="default">Default</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
        <option value="newest">Newest</option>
      </select>
    </div>
  );
};
