import React, { useState, useMemo, useCallback } from "react";

const ExampleComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [items, setItems] = useState([
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
    { id: 4, name: "Date" },
    { id: 5, name: "Elderberry" },
  ]);

  // Memoize the filtered and sorted list
  const filteredAndSortedItems = useMemo(() => {
    console.log("Filtering and sorting items...");
    let filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredItems.sort((a, b) => {
      if (sortOrder === "asc") return a.name.localeCompare(b.name);
      return b.name.localeCompare(a.name);
    });
  }, [items, searchTerm, sortOrder]);

  // Memoize a callback to add a new item to the list
  const addItem = useCallback(() => {
    const newItem = { id: items.length + 1, name: `New Item ${items.length + 1}` };
    setItems((prevItems) => [...prevItems, newItem]);
  }, [items]);

  return (
    <div>
      <h1>useMemo and useCallback Example</h1>
      <div>
        <label>
          Search:
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Sort Order:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <button onClick={addItem}>Add Item</button>
      <ul>
        {filteredAndSortedItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExampleComponent;
