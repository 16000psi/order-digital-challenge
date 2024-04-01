import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL("http://localhost:11194/api/data");

        const response = await fetch(url);
        const jsonData = await response.json();
        setData(jsonData);

      } catch (error) {
        throw new Error(`Error contacting API: ${response.statusText}`);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Restaurant Portal</h2>
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
