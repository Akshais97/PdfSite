import { useEffect, useState } from 'react';
import '../styles/utilitypage.css';

export default function UtilityPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from your Spring Boot backend
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Update this URL to match your Spring Boot backend
      const response = await fetch('http://localhost:8080/api/data');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="utility-page">
      <div className="utility-container">
        <h1>Utility Dashboard</h1>
        
        <div className="utility-content">
          {loading && <p className="loading">Loading data...</p>}
          {error && <p className="error">Error: {error}</p>}
          
          {!loading && !error && data.length === 0 && (
            <p className="no-data">No data available. Start by refreshing or adding new items.</p>
          )}

          {!loading && !error && data.length > 0 && (
            <div className="data-list">
              {data.map((item, index) => (
                <div key={index} className="data-item">
                  {/* Customize this based on your data structure */}
                  <p>{JSON.stringify(item)}</p>
                </div>
              ))}
            </div>
          )}

          <button className="refresh-btn" onClick={fetchData}>
            Refresh Data
          </button>
        </div>
      </div>
    </div>
  );
}
