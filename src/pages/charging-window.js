import { useState, useEffect } from 'react';

export default function ChargingWindow() {
  const [hours, setHours] = useState(2);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://cleanenergybackend.onrender.com/charging-window?hours=${hours}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching charging window:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [hours]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Charging Window</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <label htmlFor="hours-select" style={{ marginRight: '10px', fontSize: '1.1rem' }}>
          Select charging duration:
        </label>
        <select 
          id="hours-select" 
          value={hours} 
          onChange={(e) => setHours(Number(e.target.value))}
          style={{ 
            padding: '8px', 
            fontSize: '1rem', 
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        >
          {[1, 2, 3, 4, 5, 6].map(h => (
            <option key={h} value={h}>{h} hours</option>
          ))}
        </select>
      </div>

      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {data && !loading && (
        <div style={{ 
          border: '1px solid #e1e1e1', 
          borderRadius: '12px', 
          padding: '30px', 
          maxWidth: '600px', 
          margin: '0 auto',
          backgroundColor: '#fff',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>      
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>Start Time</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>
                {new Date(data.from).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#999', margin: 0 }}>
                {new Date(data.from).toLocaleDateString()}
              </p>
            </div>
            
            <div style={{ alignSelf: 'center', color: '#ccc', display: 'flex' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>

            <div>
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>End Time</p>
              <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0 }}>
                {new Date(data.to).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p style={{ fontSize: '0.8rem', color: '#999', margin: 0 }}>
                {new Date(data.to).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            backgroundColor: '#f0f9ff', 
            borderRadius: '8px',
            color: '#0066cc'
          }}>
            <span style={{ fontWeight: 'bold' }}>Average Clean Energy Percentage: </span>
            <span style={{ fontSize: '1.2rem' }}>{data.averagePercentage.toFixed(1)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
