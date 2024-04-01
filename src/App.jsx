import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("ascending");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL("http://localhost:11194/api/data");
        url.searchParams.append("sortBy", sortBy);
        url.searchParams.append("order", order);

        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        throw new Error(`Error contacting API: ${response.statusText}`);
      }
    };
    fetchData();
  }, [sortBy, order]);

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  return (
    <div>
      <h2>Restaurant Portal</h2>
      <div>
        <nav>
          <p>List items by:</p>
          <select name="fields" id="fields" onChange={handleSortByChange}>
            <option value="name">Name</option>
            <option value="rating">Rating</option>
            <option value="cuisine">Cuisine</option>
            <option value="distance_km">Distance (km)</option>
          </select>
          <p>Order:</p>
          <select name="order" id="order" onChange={handleOrderChange}>
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </nav>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rating</th>
            <th>Cuisine</th>
            <th>Distance (km)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.rating}</td>
              <td>{item.cuisine}</td>
              <td>{item.distance_km}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
