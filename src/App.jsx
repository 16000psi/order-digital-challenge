import { useState, useEffect } from "react";
import "./assets/App.css";

function App() {
  const [data, setData] = useState([]);
  const [cuisines, setCuisines] = useState([])
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("ascending");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams({
            sortBy: sortBy,
            order: order,
            filter: filter
        }).toString();
        
        const apiUrl = `/api/data?${params}`;
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        setData(jsonData);


        const cuisinesArr = jsonData.map(obj => obj.cuisine)
        if (!filter) {
          setCuisines([...new Set(cuisinesArr)])
        }
      } catch (error) {
        throw new Error(`Error contacting API: ${response.statusText}`);
      }
    };
    fetchData();
  }, [sortBy, order, filter]);


  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleOrderChange = (event) => {
    setOrder(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };


  return (
    <div className="app">
      <h2>Restaurant Portal</h2>
      <div>
        <nav className="sort-by">
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
          <p>Cuisine:</p>
          <select name="filter" id="filter" onChange={handleFilterChange}>
            <option value="">All</option>
            {cuisines.map((item, i) => (
              <option key={i} value={item}>{item}</option>
            ))}
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
